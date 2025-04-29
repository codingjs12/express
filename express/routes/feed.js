const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/", async (req, res) => {

    try{
        let query = "SELECT * FROM TBL_FEED";
        let [list] = await db.query(query);
        res.json({
            message : "result",
            list : list
        })
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.get("/:id", async (req, res) => {
    let {id} = req.params;

    try{
        let query = "SELECT * FROM TBL_FEED WHERE ID = ?";
        let [list] = await db.query(query, [id]);
        res.json({
            message : "result",
            feed : list[0]
        })
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.put("/:id", async (req, res) => {
    let {id} = req.params;
    let {userId, content} = req.body;
    console.log(id, userId, content);
    try{
        let query = "UPDATE TBL_FEED SET USERID = ?, CONTENT = ? WHERE ID = ?";
        let result = await db.query(query, [userId, content, id]);
        res.json({
            message : "수정 완료",
            result : result
        })
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.delete("/:id", async (req, res) => {
    let {id} = req.params;
    try{
        let query = "DELETE FROM TBL_FEED WHERE ID = ?";
        let result = await db.query(query, [id]);
        console.log(result);
        res.json({
            message : "삭제 완료",
            result : result
        })
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.post("/", async (req, res) => {
    let {userId, content} = req.body;
    try{
        let query = "INSERT INTO TBL_FEED VALUES(null, ?, ?, NOW())";
        let result = await db.query(query, [userId, content]);
        console.log(result);
        res.json({
            message : "등록 완료",
            result : result
        })
    } catch(err) {
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})



module.exports = router;