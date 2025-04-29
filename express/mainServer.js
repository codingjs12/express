const express = require('express');
const db = require('./db');
const cors = require('cors');
const boardRouter = require('./routes/board');
const feedRouter = require('./routes/feed');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/board", boardRouter);
app.use("/feed", feedRouter);


app.listen(3000, ()=>{
    console.log("서버 실행 중!"); 
})