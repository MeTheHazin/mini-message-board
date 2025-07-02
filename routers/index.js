const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  { id: 2, text: "Hello World!", user: "Charles", added: new Date() },
];

indexRouter.get("/", (req, res) => {
  try {
    res.render("index", { title: "mini message board", messages: messages });
  } catch (error) {
    res.status(500).send(error);
  }
});

indexRouter.get("/new", (req, res) => {
  try {
    res.render("form");
  } catch (error) {
    res.status(500).send(error);
  }
});

indexRouter.post("/new", (req, res) => {
  try {
    const { messageText, messageUser } = req.body;

    let nextId;

    if (messages.length > 0) {
      nextId = messages[messages.length - 1].id + 1;
    } else {
      nextId = 1;
    }

    messages.push({
      id: nextId,
      text: messageText,
      user: messageUser,
      added: new Date(),
    });

    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

indexRouter.get("/message/:id", (req, res) => {
  try {
    const message = messages.find((m) => {
      return m.id === parseInt(req.params.id);
    });
    if (!message) {
      res.status(404).send("message not found");
    }
    res.render("messageDetail", { message });
  } catch (error) {
    throw error;
  }
});
module.exports = indexRouter;
