const express = require('express');
const db = require('../../db');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. 패키지 추가
const multer = require('multer');

// 2. 저장 경로 및 파일명
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });



router.post("/join", async (req, res) => {
    let {email, pwd, userName, addr, phone, intro, birth } = req.body;
    try {
        let hashPwd = await bcrypt.hash(pwd, 10);
        let query = "INSERT INTO TBL_MEMBER VALUES(?, ?, ?, ?, ?, ?, ?, NULL, NOW(), NOW())";
        let [user] = await db.query(query, [email, hashPwd, userName, addr, phone, intro, birth]);
        res.json({

        })
  
    } catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.get("/:email", async (req, res) => {
    let {email} = req.params;
    try {
        let query = "SELECT * FROM TBL_MEMBER WHERE EMAIL = ?";

        let [list] = await db.query(query, [email]);
        res.json({
            message : "result",
            info : list[0]
        })
        

    } catch (err) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }

})

// 3.

router.put("/upload", upload.single('file'), async (req, res) => {
    let { email } = req.body;
    const filename = req.file.filename;
    const destination = req.file.destination;
    try {
        let query = "UPDATE TBL_MEMBER SET profileImg = ? WHERE EMAIL = ?"

        let result = await db.query(query, [destination+filename, email]);
        res.json({
            message : "수정 완료",
            result : result,
            
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router