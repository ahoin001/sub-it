const express = require('express');
const subtitleRouter = express.Router();
const Subtitle = require("../models/Subtitle");

/*******************************************************
 * 
 *                   GET ROUTES
 * 
 * *****************************************************/

subtitleRouter.post('/:projectID/add-sub', (req,res,next) => {  
  console.log('This is my new sub and the project ID is: ' + req.params.projectID);
  res.render('index');  
});

/*******************************************************
 * 
 *                   POST ROUTES
 * 
 * *****************************************************/


module.exports = subtitleRouter;