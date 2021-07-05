const express = require("express");
const app = express();

app.listen(3001, () => {
  console.log("Yay! your server is running!");
})

const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234567890q",
  database: "planner",
});

app.post("/create", (req, res) => {
  const taskText = req.body.taskText;
  db.query(
    "INSERT INTO taskdata (taskText) VALUES (?)",
    [taskText],
    (err, result) => {
      console.log(result)
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({Id: result.insertId});
      }
    }
  );
  })

  app.get("/taskdata", (req, res) => {
    db.query("SELECT * FROM taskdata", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.delete("/delete/:id", (req, res) => {
    console.log('backend up')
    const id = req.params.id;
    try {db.query("DELETE FROM taskdata WHERE Id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
    } catch(err) {
      console.log(err)
    }
});
  
app.post("/update/:id", (req, res)=>{
  const id = req.params.id
  const sqlUpdate = "UPDATE taskdata SET completed = true WHERE Id = ?"
  db.query(sqlUpdate, id, (err, result) => {
          if (err)
          console.log(err)
  })
})
