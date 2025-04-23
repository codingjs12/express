const express = require('express');

const app = express();
const db = require("./db");
const cors = require('cors');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const session = require('express-session');

app.use(express.json())
app.use(cors({
  origin : "http://localhost:5501",
  credentials : true
}))

app.use(session({
  secret : 'test1234',
  resave : false,
  saveUninitialized : false,
  cookie : {
    httpOnly : true,
    secure : false,
    maxAge : 1000 * 60 * 30
  }
}))

app.use("/product", productRouter)
app.use("/user", userRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log("서버 실행중!");
})