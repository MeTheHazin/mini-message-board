const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routers/index");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
