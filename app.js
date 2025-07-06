const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routers/index");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pgSession = require("connect-pg-simple")(session);

const pool = require("./db/pool");
const db = require("./db/queries");

app.use(
  session({
    store: new pgSession({
      pool: pool, // reusing your existing pg pool
      tableName: "user_sessions",
    }),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // optional: 1 day
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// middleware to access currentUser
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "incorrect password dumbass" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (!rows[0]) {
      return done(null, false); // User not found
    }
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

// check for invalid sessions
app.use((req, res, next) => {
  if (req.user === false) {
    // From deserializeUser when user not found
    req.logout(() => {});
    return res.redirect("/"); // Or handle differently
  }
  next();
});

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
