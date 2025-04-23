const express = require('express')

const app = express()
const db = require("./db")
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get("/product/:productId", async(req, res) => {
  let { productId } = req.params;
    try {
      let [list] = await db.query("SELECT * FROM TBL_PRODUCT WHERE PRODUCTID = " + productId);
      console.log(list);
      res.json({
        message : "result",
        info : list[0]
      });
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

app.get("/product", async(req, res) => {
    let { pageSize, offset } = req.query;
    try {
      let query = "SELECT * FROM TBL_PRODUCT LIMIT ? OFFSET ?";
      let [list] = await db.query(query, [parseInt(pageSize), parseInt(offset)]);
      let [count] = await db.query("SELECT COUNT(*) AS cnt FROM TBL_PRODUCT");

      res.json({
        message : "result",
        list : list,
        count : count[0].cnt
      });
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

app.post("/product", async(req, res) => {
    let {productName, description, price, stock, category} = req.body;
    let query = "INSERT INTO TBL_PRODUCT VALUES(NULL, ?, ?, ?, ? , ?, 'Y', NOW(), NOW())";
    try {
      let result = await db.query(query, [productName, description, price, stock, category]);
      res.json({
        message : "success",
        result : result
      });
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})
app.put("/product/:productId", async(req, res) => {
    let {productId} = req.params;
    let {productName, description, price, stock, category} = req.body;
    let query = "UPDATE TBL_PRODUCT SET productName=?, description=?, price=?, stock=?, category=? WHERE productId = ?";
    try {
      let result = await db.query(query, [productName, description, price, stock, category, productId]);
      res.json({
        message : "수정되었습니다.",
        result : result
      });
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

app.delete("/product/:productId", async(req, res) => {
    let {productId} = req.params;
    let query = "DELETE FROM TBL_PRODUCT WHERE PRODUCTID =" + productId;
    try {
      let result = await db.query(query, [productId]);
      res.json({
        message : "success",
        result : result
      });
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

app.listen(3000)