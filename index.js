require("dotenv").config();

// import
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// config
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const db = require("monk")(process.env.MONGO_URI);
const todo = db.get("todo");

// api
app.get("/", (req, res) => {
  res.json("Hello World.");
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = await todo.insert({
    text: req.body.text
  });
  res.json(newTodo);
});

app.delete("/todos/:_id", async (req, res) => {
  const deleteTodo = await todo.remove({
    _id: req.params._id
  });
  res.json(deleteTodo);
});

// serve
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Host : http://localhost:${PORT}`));
