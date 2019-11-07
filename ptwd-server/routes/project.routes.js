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

 console.log("in the project route ************************* ");
projectRouter.get('/dashboard/:userId', (req, res, next) => {
  console.log("this is the current user ++++++++++++++++++++++ ", req.params.userId)
  // Finding all  projects with the userId matching the current session _id
  Project

    // These results should populate the user's landing page/dashboard
    .find({userId: req.params.userId})
    .then((projects) => {
     console.log("this is working !!!!!!!!!!! ", projects)
      // res.render('index');
      res.status(200).json(projects);

    }).catch(err => res.status(402).json(err))

});


projectRouter.get('/testsort/:id', (req, res, next) => {

  // Finding all  projects with the userId matching the current session _id
  Project

    // These results should populate the user's landing page/dashboard
    .findById(req.params.id)
    .then((project) => {

      const converted = project.subtitleArray.map(oneSub => {
        convertToMS(oneSub.inTime);
      })
      converted.sort(-1)
      project.converted = converted;
      console.log('', project.subtitleArray.sort({'inTime': -1}));
      // res.render('index');
      res.status(401).json({project});

    })

});

/*******************************************************
 * 
 *                   CREATE ROUTE
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

      const { userId = req.user._id, videoURL = result.url, title, genre, description, createdBy = req.user.fullName, language } = req.body;

      Project
        .create({ userId, videoURL, title, genre, description, createdBy, language }) //creates new project document in DB with this info
        .then(projectDocument => {

          res.status(401).json({ message: "CREATE WAS SUCCESSFUL!" });
          // 
          console.log('Successfully saved video url!');
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