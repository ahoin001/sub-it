const express = require('express');
const subtitleRouter = express.Router();
const SubtitleProject = require('../models/SubtitleProject');

subtitleRouter.get('/dashboard/:id', (req,res,next) => {
  const id = req.params.id;
  console.log(id);
  res.render('index');
});





module.exports = subtitleRouter;