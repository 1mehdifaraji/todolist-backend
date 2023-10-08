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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
