const express = require('express');
const subtitleRouter = express.Router();
const SubtitleProject = require('../models/SubtitleProject');

subtitleRouter.get('/dashboard', (req,res,next) => {  
  SubtitleProject
  .find({ 'userId': req.user._id }, (err, projects) => {
    console.log(projects);
  });
  res.render('index');
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