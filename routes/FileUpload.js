const express = require("express");
const router = express.Router();

const {loaclFileUpload} = require("../controllers/fileUpload");

// api route
router.post("/localFileUpload",loaclFileUpload);

module.exports = router;