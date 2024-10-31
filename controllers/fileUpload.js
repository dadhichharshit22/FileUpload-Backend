const { response } = require("express");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFileUpload -> handler function 

exports.localFileUpload = async(req,res) =>{
    try{
       // fetch file from request
       const file = req.files.file;
       console.log("File Aagyi jee ->",file);

     // create path where file need to be stored on server
       let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
       console.log("Path -> ",path);
         // add path to the move function
       file.mv(path,(err)=>{
        console.log(err);
       });
       // create a succesfully response 
       res.json({
        success:true,
        message:'Local File Uploaded Successfully',
       });
    }
    catch(error){
        console.log("Not able to upload the file on server");
    console.log(error);
    }
}


// image upload ka handler
function isFileTypeSupported(file,supportedTypes){
   return supportedTypes.include(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    console.log("temp file path",file.tempFilePath);

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.imageUpload = async(req,res) =>{
    try{
   // data fetch
   const {name,tags,email} = req.body;
   console.log(name,tags,email);

   const file = req.files.imageFile;
   console.log(file);

   // validation

   const supportedTypes = ["jpg","jpeg","png"];
   const fileType = file.name.split('.')[1].toLowerCase();
   console.log("File Type:",fileType);

   if(!isFileTypeSupported(file,supportedTypes)){
   return res.status(400).json({
    success:false,
    message:'file format not suppported',
   });
  }
   
   // file format supported hai
   console.log("Uploading to Codehelp");
   const response = await uploadFileToCloudinary(file,"codehelp");
   console.log(response);

   // db ma entry save krni h
   const fileData = await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
   });


    res.json({
        success:true,
        message:'Image Successfully Uploaded'
    });
    }
    catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        imageUrl:response.secure_url,
        message:'Something went Wrong'
    })
    }
}


// video upload ka handler
exports.videoUpload = async(req,res) => {
   try{
     // data fetch
     const {name,tags,email} = req.body;
     console.log(name,tags,email);

     const file = req.files.videoFile;

     // validation
     const supportedTypes = ["mp4","mov"];
     const fileType = file.name.split('.')[1].toLowerCase();
     console.log("File Type:",fileType);

     // TODO : add a UpperLimit of 5mb for Video files
     if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:'File Format not supported',
        })
     }

     // file format supported hai
     console.log("Uploading Video file to Codehelp folder");
     const response = await uploadFileToCloudinary(file,"codehelp");
     console.log(response);

     // db ma entry save krni hai
     const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
     });

     res.json({
        success:true,
        imageUrl:response.secure_url,
        message:"Video Uploading Successfullly",
     });

   }
   catch(error){
    console.log(error);
    res.status(400).json({
        success:false,
        message:'Something Went wrong in video uploading',
    })
   }
}

// imageSizeReducer Handler

exports.imageSizeReducer = async(req,res) =>{
    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //  validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);

        // TODO: add a upper limit here
        if(!isFileTypeSupported(fileType,supportedTypes)){
           return res.status(400).json({
            success:false,
            message:'File Format not Supported'
           })
        }
        // file format supported hai
        console.log("Uploading reduced image file to codehelp folder");
        // hw-> reduce quality using height and width 
        //TODO: height attribute -> COMPRESS
        const response = await uploadFileToCloudinary(file,"codehelp",30);
        console.log(response);

        // db ma entry save krni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });
        res.json({
            success:true,
            message:'Image Successfully Uploaded'
        })
    }
   catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        message:'Something went wrong uploading',
    });
   }

}