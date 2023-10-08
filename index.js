const express = require("express");
const list = require("./list.json");
const fs = require("fs");

const app = express();
const port = 8081;

const filename = "list.json";

app.use(express.json());

app.get("/list", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(list);
});

app.post("/list", async (req, res) => {
  const todo = req.body;

  list.list.push(todo);
  fs.writeFile(filename, JSON.stringify(list), () => {});
  res.json(list);
});

app.put("/list", async (req, res) => {
  const body = req.body;

  list.list.map((todo) => {
    const newTodo = { ...todo };
    if (body.description === todo.description)
      todo.isCompleted = !todo.isCompleted;
    return newTodo;
  });

  fs.writeFile(filename, JSON.stringify(list), () => {});

  res.json(list);
});

app.delete("/list", async (req, res) => {
  const body = req.body;

  const filteredList = list.list.filter(
    (todo) => body.description !== todo.description
  );

  list.list = filteredList;

  fs.writeFile(filename, JSON.stringify(list), () => {});

  res.json(list);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
