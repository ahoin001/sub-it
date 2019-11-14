const express = require('express');
const projectRouter = express.Router();
const Project = require("../models/Project");

// // This package allows access tmp file url for passing to cloudinary
const fileUpload = require('express-fileupload');

// Import CLoudinary from config files where we set access keys
const cloudinary = require('../configs/cloudinaryconfig');

/*******************************************************
 * 
 *                   GET/READ ROUTES
 * 
 * *****************************************************/

projectRouter.get('/api/dashboard/:userId', (req, res, next) => {

  console.log("this is the current user ++++++++++++++++++++++ ", req.params.userId)

  // Finding all  projects with the userId matching the current session _id
  Project

    // Return all documents with the provided userID
    .find({ userId: req.params.userId })
    .then((projects) => {

      // Make sure we have projects
      console.log("CURRENT USER PROJECTS !!!!!!!!!!! ", projects)

      // res.render('index');
      res.status(200).json(projects);

    }).catch(err => res.status(402).json(err))

});

/*******************************************************
 * 
 *                   CREATE ROUTE
 * 
 * *****************************************************/

// Use temp files(paths) for holding projects before passing to cloudinary
projectRouter.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

projectRouter.post('/api/create-project/:userId', async (req, res, next) => {

  // If user signed in show me
  if (req.user) {
    console.log("this is the user info on POST >>>>>>>>>>>>>>>>>>>> ", req.user)
    console.log("this is the user Req.ID on POST >>>>>>>>>>>>>>>>>>>> ", req.user._id)
  }

  console.log(`-------------------------------- ENTERING CREATE PROJECT ROUTE --------------------------------`);

  // In req.files, fileName is the key used to get the value of file we are looking for from form that was uploaded front end's form data
  // req.files.fileNameFromFormdata; In this case, we named the file 'videoFile' in front end so thats how it is accessed
  // console.log(req.files);

  console.log(`++++++++++++++++++ File From Form ++++++++++++++++++`, req.files.videoFile);

  console.log('&&&&&&&&& STARTING CLOUDINARY &&&&&&&&&')

  cloudinary.uploader.upload(req.files.videoFile.tempFilePath, { resource_type: "video" },
    function (error, result) {

      console.log(`@@@@@@@@@ INSIDE COLOUD FUNCTION @@@@@@@@@`)
      console.log('error', error);


      // Cloudinary response where we can get videos url from after
      console.log('++++++++++++ Result after saving to cloudinary ++++++++++++ ', result);


      // Create object with data from req.body ( Forms other inputs ) to create document of project for the DB
      // result.url is video url created by cloudinary, result is the response from cloudinary with property url that we want to take
      // req.user._id is how we get the unique id of signed in user from passport (POST REQUESTS MUSST BE SENT WITH CREDENTIALS TO GET THIS)

      const { userId = req.user._id, videoURL = result.url, title, genre, description, createdBy = req.user.fullName, language } = req.body;

      console.log(`@@@@@@@@@@@@@@@ ABOUT TO SAVE PROJECT TO DB @@@@@@@@@@@@@@@`);

      Project
        .create({ userId, videoURL, title, genre, description, createdBy, language }) //creates new project document in DB with this info
        .then(projectDocument => {

          res.status(200).json({ message: "CREATE WAS SUCCESSFUL!" });

          // Document save was successful, view it's data in console if needed
          console.log(`projectDocument is ======================================================= ${projectDocument}`);

        }).catch(err => next(err))
        .catch(err => next(err));

    });

});

/********************************************************** 
  
 * UPDATE AND DELETE
 * req.params is whatever the value in the url in place of our parameter is
 
***********************************************************/

// UPDATE ROUTE
projectRouter.post("/project/:id/updateProject", (req, res) => {

  // Find Project in DB using current user ID , and update the username to what is in the form
  Project
    .findByIdAndUpdate(req.params.id, { title: req.body.title, genre: req.body.genre, description: req.body.description, language: req.body.language }, { new: true })
    .then((project) => {
      console.log('========================================================================================================================================')
      console.log(project);
      console.log('========================================================================================================================================')
      res.json(project)
    })
    .catch((err) => {
      console.log(`Error updating document`, err);
    })

});

// DELETE ROUTE
projectRouter.post('/project/:id/deleteProject', (req, res, next) => {

  console.log('PROJECT BEING DELETED');
  console.log('=====================================================');
  console.log(req.params.id);

  Project.findByIdAndRemove(req.params.id)
    .then(() => {

      res.status(401).json({ message: "Delete WAS SUCCESSFUL!" });

    })
    .catch((err) => {
      next(err);
    })
})




module.exports = projectRouter;