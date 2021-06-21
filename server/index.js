const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *", // INSERTING actions such as inserting or deleting we want to return back the data.
      [description]
    );

    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
