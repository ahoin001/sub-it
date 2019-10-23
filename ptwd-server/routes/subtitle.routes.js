const express = require('express');
const subtitleRouter = express.Router();
const SubtitleProject = require("../models/SubtitleProject");

// // This package allows access to uploaded files from req.files
const fileUpload = require('express-fileupload');

// Import CLoudinary from config files where we set access keys
const cloudinary = require('../configs/cloudinaryconfig');

/*******************************************************
 * 
 *                   GET ROUTES
 * 
 * *****************************************************/
// TODO Something here is not closed , Whenever it is uncommented it messes up export

subtitleRouter.get('/dashboard/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
});

subtitleRouter.get('/dashboard', (req,res,next) => {  
  SubtitleProject
  // Finding all subtitle projects with the userId matching the current session _id
  // These results should populate the user's landing page/dashboard
  .find({ 'userId': req.user._id })
  .then((projects) => {
  console.log(projects);
  res.render('index');})

});

// Test get route to pull user object id
subtitleRouter.get('/subtitleroute', (req, res, next) => {
  console.log('this is the sub route ');
  res.render('index');
});


/*******************************************************
 * 
 *                   POST ROUTES
 * 
 * *****************************************************/

// TODO Where is this on my local? This is probably okay for demo but not scalable I think
// Use temp files instead of memory for managing the upload process.
subtitleRouter.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Route to create a Project
subtitleRouter.post('/dashboard/create-project', (req,res,next) => {
  // Creating subtitle project with req.user._id to find collection 
  const { userId = req.user._id, title, genre, description, createdBy = req.user.fullName, language } = req.body;
  SubtitleProject
  .create({ userId , title, genre, description, createdBy , language }) //creates a new subtitle project in the database
  .then( userDoc => {
    //   
   })
  .catch( err => next(err) ); // close SubtitleProject.create()
  res.render('index');
});

// Test post route to create collections in database, adding the current 
// Add upload.single to middleware chain
subtitleRouter.post("/createsub", (req, res, next) => {

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

      console.log(" Starting  cloudinary method data StartingStartingStartingStartingStartingStartingStartingStartingStartingStarting ");
      console.log('error', error);
      console.log('result', result);
      console.log(" Exiting cloudinary method data ExitingExitingExitingExitingExitingExitingExitingExitingExitingExitingExitingExiting ");

      console.log(result.url, '***********************************************');
      videoURL = result.url;

      SubtitleProject
        .create({ videoURL: videoURL }) //creates new subtitle document in DB with this info
        .then(subtitleDocument => {

          res.status(401).json({ message: "CREATE WAS SUCCESSFUL!" });
          // 
          console.log('Successfully saved video url!');
          console.log(`subtitleDocument is ======================================================= ${subtitleDocument}`);

        })
        .catch(err => next(err)); 

    });

});

module.exports = subtitleRouter;