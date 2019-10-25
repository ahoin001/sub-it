const express = require('express');
const subtitleRouter = express.Router();
const Subtitle = require("../models/Subtitle");

/*******************************************************
 * 
 *                   GET ROUTES
 * 
 * *****************************************************/



/*******************************************************
 * 
 *                   POST ROUTES
 * 
 * *****************************************************/

subtitleRouter.post('/:projectId/add-sub', (req,res,next) => {  
  console.log('This is my new sub and the project ID is: ' + req.params.projectId);
  const {projectId = req.params.projectId, inTime, outTime, text } = req.body;
  Subtitle
        .create({projectId, inTime, outTime, text }) //adds new subtitle to current project
        .then(projectDocument => {

          res.status(401).json({ message: "Subtitle added" });          
          console.log(`=======================================================`);
          
        }).catch(err => next(err))
        .catch(err => next(err));
  res.render('index');  
});

module.exports = subtitleRouter;