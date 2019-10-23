const express = require('express');
const subtitleRouter = express.Router();
const SubtitleProject = require("../models/SubtitleProject");

// // This package allows access to uploaded files from req.files
const fileUpload = require('express-fileupload');

// Import CLoudinary from config files where we set data
const cloudinary = require('../configs/cloudinaryconfig');

subtitleRouter.get('/dashboard/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  res.render('index');
});

// TODO Where is this on my local?
// Use temp files instead of memory for managing the upload process.
subtitleRouter.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Test get route to pull user object id
subtitleRouter.get('/subtitleroute', (req, res, next) => {
  console.log('this is the sub route ');
  res.render('index');
});

// Test post route to create collections in database, adding the current 
// Add upload.single to middleware chain
subtitleRouter.post("/createsub", (req, res, next) => {

  // In Postman, fileName is the key we use to get the value ( of file) that was uploaded
  const theFile = req.files.fileName;
  let videoURL = '';

  console.log(" form data-------------------------------------: ",
    req.body, theFile);

  console.log(" Entering cloudinary method data------------------------------------ ");

  cloudinary.uploader.upload(theFile.tempFilePath, { resource_type: "video" },
    function (error, result) {

      console.log(" Starting  cloudinary method data------------------------------------ ");
      console.log('error', error);
      console.log('result', result);
      console.log(" Exiting cloudinary method data------------------------------------ ");

      videoURL = result.url;
    });

  SubtitleProject
    .create({ videoURL: videoURL }) //creates new subtitle document in DB with this info
    .then(userDoc => {

      // 
      console.log('Successfully saved video url!');
      console.log(userDoc);


    })
    .catch(err => next(err)); // close Dummy.create()

});



module.exports = subtitleRouter;