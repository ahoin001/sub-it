const express = require('express');
const subtitleRouter = express.Router();
const SubtitleProject = require('../models/SubtitleProject');

subtitleRouter.get('/dashboard', (req,res,next) => {
  const id = req.user._id;
  console.log(id);
  res.render('index');
});

subtitleRouter.post('/dashboard/create-sub', (req,res,next) => {
  const id = req.user._id;
  console.log('This is the id the I have in the params: ' + id);

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