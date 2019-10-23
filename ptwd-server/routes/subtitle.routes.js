const express = require('express');
const subtitleRouter = express.Router();
const SubtitleProject = require('../models/SubtitleProject');

subtitleRouter.get('/dashboard', (req,res,next) => {  
  SubtitleProject
  // Finding all subtitle projects with the userId matching the current session _id
  // These results should populate the user's landing page/dashboard
  .find({ 'userId': req.user._id })
  .then((projects) => {
  console.log(projects);
  res.render('index');

  });
});

subtitleRouter.post('/dashboard/create-sub', (req,res,next) => {
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



module.exports = subtitleRouter;