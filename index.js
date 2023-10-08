const express = require("express");
const list = require("./list.json");
const fs = require("fs");

const app = express();
const port = 8081;

app.use(express.json());

app.get("/list", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(list);
});

app.post("/list", async (req, res) => {
  const todo = req.body;

  list.list.push(todo);
  fs.writeFile("list.json", JSON.stringify(list), () => {});
  res.json(list);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
