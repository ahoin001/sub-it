const express = require('express');
const projectRouter = express.Router();
const Project = require("../models/Project");

// // This package allows access to uploaded files from req.files
const fileUpload = require('express-fileupload');

// Import CLoudinary from config files where we set access keys
const cloudinary = require('../configs/cloudinaryconfig');

/*******************************************************
 * 
 *                   GET ROUTES
 * 
 * *****************************************************/

projectRouter.get('/dashboard', (req,res,next) => {  
  Project
  // Finding all subtitle projects with the userId matching the current session _id
  // These results should populate the user's landing page/dashboard
  .find({ 'userId': req.user._id })
  .then((projects) => {
  console.log(projects);
  res.render('index');})

/*******************************************************
 * 
 *                   POST ROUTES
 * 
 * *****************************************************/

// TODO Where is this on my local? This is probably okay for demo but not scalable I think
// Use temp files instead of memory for managing the upload process.
projectRouter.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

projectRouter.post('/dashboard/create-project', (req, res, next) => {

  // In Postman, fileName is the key used to get the value ( of file) that was uploaded
  const theFile = req.files.fileName;

  // To hold value of url cloudinary gives us
  let videoURL = '';

  console.log(" REQUEST DATA REQUESTREQUESTREQUESTREQUESTREQUESTREQUESTREQUESTREQUESTREQUESTREQUEST ",
    req.body, theFile);

  console.log(" Entering cloudinary method EnteringEnteringEnteringEnteringEnteringEnteringEnteringEntering ");

  cloudinary.uploader.upload(theFile.tempFilePath, {
    resource_type: "video"
  },
    function (error, result) {

      console.log('error', error);
      console.log('result', result);

      const { userId = req.user._id,videoURL = result.url, title, genre, description, createdBy = req.user.fullName, language } = req.body;

      Project
        .create({userId, videoURL,title, genre, description, createdBy, language }) //creates new subtitle document in DB with this info
        .then(projectDocument => {

          res.status(401).json({ message: "CREATE WAS SUCCESSFUL!" });
          // 
          console.log('Successfully saved video url!');
          console.log(`projectDocument is ======================================================= ${projectDocument}`);
          
        }).catch(err => next(err))
        .catch(err => next(err));

    });

});

module.exports = projectRouter;