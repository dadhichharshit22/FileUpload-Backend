// app create 
const express = require("express");

const app = express();

// PORT find karna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware  add karna hai
app.use(express.json());

const fileupload = require("express-fileupload");
app.use(fileupload());
// db se connect karna hai
const db = require("./config/database");
db.connect();
// cloud se connect karna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount karna hai
const Upload = require("./routes/FileUpload");
app.use("api/v1/upload",Upload);

// activate server

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})