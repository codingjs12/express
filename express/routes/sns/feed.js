const express = require('express');
const db = require('../../db');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
    try{
        let query = "SELECT * FROM TBL_FEED F INNER JOIN TBL_FEED_IMG I ON F.ID = I.FEEDID WHERE THUMBNAIL = 'Y'";
        let [list] = await db.query(query);
        
        res.json({
            message : "result",
            list : list
        })

    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    try{
        let query = "SELECT * FROM TBL_FEED WHERE ID = " + id;
        let sql = "SELECT * FROM TBL_FEED_IMG WHERE FEEDID =" +id;
        let [list] = await db.query(query);
        let [imgList] = await db.query(sql);
        
        res.json({
            message : "result",
            feed : list[0],
            imgList : imgList
        })

    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})


router.post("/upload", upload.array('file'), async (req, res) => {
    let {feedId} = req.body;
    const files = req.files;
/*
    req.files
    const filename = req.file.filename;
    const filePath = req.file.destination;
*/

    try{
        let results = [];
        let thumbnailFlg = true;

        for(let file of files) {
            let filename = file.filename;
            let filePath = file.path;
            let thumbnail = thumbnailFlg ? "Y" : "N";
            
            let query = "INSERT INTO TBL_FEED_IMG VALUES(null, ?, ?, ?, ?)";
            let result = await db.query(query, [feedId, filename, filePath, thumbnail]);
            results.push(result);
        }
        res.json({
            message : "등록 완료",
            result : results
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

router.post("/", async (req, res) => {
    let {email, title, content} = req.body;
    try{
        let query = "INSERT INTO TBL_FEED VALUES(null, ?, ?, ?, NOW())";
        let result = await db.query(query, [email, title, content]);
        console.log(result);
        res.json({
            message : "등록 완료",
            result : result[0]
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;