const express = require('express');
const db = require('../db');
const router = express.Router();

router.post("/login", async(req, res) => {
    let { userId, password } =req.body;
    try {
      let query = "SELECT * FROM TBL_USER WHERE USERID = ? AND PWD = ? ";
      let [user] = await db.query(query, [userId, password]);
      let result = {};
      if(user.length > 0) {
        

        result = {
          message : "로그인 성공!",
          user : user[0]
        };
      } else {
        result = {
          message : "아이디 또는 비밀번호를 확인하세요."
        }
      }
      res.json(result);
  
    } catch(err) {
      console.log("에러 발생!");
      res.status(500).send("Server Error");
    }
  })

module.exports = router;