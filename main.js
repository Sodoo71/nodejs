const express = require("express");
const { nanoid } = require("nanoid-cjs");

const app = express();
app.use(express.json());
const todos = [
  {
    id: nanoid(),
    title: "Wake up",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.send(todos);
});
app.post("/", (req, res) => {
  const body = req.body;
  const newTodo = {
    id: nanoid(),
    title: body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.send(newTodo);
});

app.delete("/", (req, res) => {
  const id = req.body.id;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return res.status(200).send({ msg: "succes" });
  } else {
    return res.status(404).send({ error: "Todo not found" });
  }
});

app.listen(3000, () => {
  console.log("http://localhost: 3000");
});
