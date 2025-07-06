const { Router } = require("express");
const db = require("../db/queries");
const passport = require("passport");

const indexRouter = Router();
const { isAuth } = require("../controllers/auth");

indexRouter.get("/", async (req, res) => {
  try {
    const messages = await db.getAllMessages();
    res.render("index", { title: "mini message board", messages: messages });
  } catch (error) {
    res.status(500).send(error);
  }
});

// post a new logics

indexRouter.get("/new", isAuth, async (req, res) => {
  try {
    await res.render("form");
  } catch (error) {
    res.status(500).send(error);
  }
});

indexRouter.post("/new", isAuth, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = res.locals.currentUser.id;
    await db.postMessage(text, userId);

    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

// get a message with all details.

indexRouter.get("/message/:id", async (req, res) => {
  try {
    const message = await db.getMessageWithId(req.params.id);

    if (!message) {
      res.status(404).send("message not found");
    }
    res.render("messageDetail", { message: message[0] });
  } catch (error) {
    throw error;
  }
});

// delete a message
indexRouter.post("/message/:id/delete", isAuth, async (req, res) => {
  const id = req.params.id;
  const userId = res.locals.currentUser.id;

  try {
    const message = await db.getMessageWithId(id);
    if (!message[0]) {
      return res.status(404).send("Message not found.");
    }
    if (message[0].username !== res.locals.currentUser.username) {
      console.log(message[0].username);
      console.log(res.locals.currentUser.username);

      return res.status(403).send("Not allowed. This is not your post.");
    }

    await db.deleteWithId(id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error deleting post.");
  }
});

//update get page
indexRouter.get("/message/:id/update", isAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const message = await db.getMessageWithId(id);
    if (!message[0]) {
      return res.status(404).send("Message not found.");
    }
    if (message[0].username !== res.locals.currentUser.username) {
      console.log(message[0].username);
      console.log(res.locals.currentUser.username);

      return res.status(403).send("Not allowed. This is not your post.");
    }

    res.render("updatePost", { message: message[0] });
  } catch (err) {
    res.status(500).send("Error loading update page.");
  }
});

//update post

indexRouter.post("/message/:id/update", isAuth, async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  const userId = res.locals.currentUser.id;
  const message = await db.getMessageWithId(id);

  try {
    if (message[0].username !== res.locals.currentUser.username) {
      console.log(message[0].username);
      console.log(res.locals.currentUser.username);

      return res.status(403).send("Not allowed. This is not your post.");
    }
    await db.updateWithId(text, id, userId);
    res.redirect(`/message/${id}`);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Something went wrong while updating the message.");
  }
});

// sign up

indexRouter.get("/sign-up", (req, res) => {
  try {
    res.render("sign-up");
  } catch (error) {
    res.status(500).send(error);
  }
});

indexRouter.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;
    await db.signUpDB(username, password);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

//log in logics

indexRouter.get("/log-in", (req, res) => {
  try {
    res.render("log-in");
  } catch (error) {
    res.status(500).send(error);
  }
});
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "log-in",
  })
);

//log out
indexRouter.get("/log-out", isAuth, (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

//delete user
indexRouter.post("/user/:id/delete", isAuth, async (req, res) => {
  try {
    const user = await db.getUserById(parseInt(req.params.id));
    if ((user[0].id = res.locals.currentUser.id)) {
      await db.deleteUserByID(user[0].id);
      req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
          res.redirect("/");
        });
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = indexRouter;
