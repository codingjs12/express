const express = require('express');

const app = express();
const db = require("./db");
const cors = require('cors');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

app.use(express.json())
app.use(cors())

app.use("/product", productRouter)
app.use("/user", userRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log("서버 실행중!");
})