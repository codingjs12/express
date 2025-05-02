const express = require('express');
const db = require('./db');
const cors = require('cors');
const boardRouter = require('./routes/board');
const feedRouter = require('./routes/feed');
const loginRouter = require('./routes/sns/login');
const path = require('path');
const memberRouter = require('./routes/sns/member');
const snsRouter = require('./routes/sns/feed');

const app = express();
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:8080", "http://localhost"],
    credentials : true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/board", boardRouter);
app.use("/feed", feedRouter);

app.use("/login", loginRouter);
app.use("/member", memberRouter);
app.use("/sns", snsRouter);


app.listen(3000, ()=>{
    console.log("서버 실행 중!"); 
});