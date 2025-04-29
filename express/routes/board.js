const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/", async (req, res) => {

    try{
        let query = "SELECT BOARDNO, TITLE, USERNAME, CNT, T.CDATETIME FROM TBL_BOARD T INNER JOIN TBL_USER U ON T.USERID = U.USERID";
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

module.exports = router;