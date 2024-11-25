const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("server is running!");
// });

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const message = messages[req.params.id];
  if (!message) return res.status(404).send("Message not found");
  res.render("message", { message });
});
