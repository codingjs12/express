const express = require('express')

const app = express()
const db = require("./db")
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get("/board/list", async(req, res) => {
    try {
      let [list] = await db.query("SELECT * FROM BOARD");
      console.log(list);
      res.json({
        message : "result",
        list : list
      });
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

app.listen(3000)