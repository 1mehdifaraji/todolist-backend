import express, { RequestHandler } from "express";
import list from "./list.json";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 8081;

const filename = "src/list.json";

app.use(cors());
app.use(express.json());

app.get("/list", ((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(list);
}) as RequestHandler);

app.post("/list", (async (req, res) => {
  const todo = req.body;

  list.list.push(todo);
  fs.writeFile(filename, JSON.stringify(list), () => {});
  res.json(list);
}) as RequestHandler);

app.put("/list", (async (req, res) => {
  const body = req.body;

  list.list.map((todo) => {
    const newTodo = { ...todo };
    if (body.description === todo.description)
      todo.isCompleted = !todo.isCompleted;
    return newTodo;
  });

  fs.writeFile(filename, JSON.stringify(list), () => {});

  res.json(list);
}) as RequestHandler);

app.delete("/list/:description", (async (req, res) => {
  const description = req.params.description;

  const filteredList = list.list.filter(
    (todo) => description !== todo.description
  );

  list.list = filteredList;

  fs.writeFile(filename, JSON.stringify(list), () => {});

  res.json(list);
}) as RequestHandler);

app.listen(port, () => {
  console.log(`Todolist app listening on port ${port}`);
});
