const express = require("express");
const router = express.Router();

const {loaclFileUpload,imageUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUpload");

// api route
router.post("/localFileUpload",loaclFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageSizeReducer",imageSizeReducer);

module.exports = router;