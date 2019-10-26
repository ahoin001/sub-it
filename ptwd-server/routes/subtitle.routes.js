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
  // TODO (in React): add projectId to the URL
  const {projectId = req.params.projectId, inTime, outTime, text } = req.body;
  Subtitle
        .create({projectId, inTime, outTime, text }) //adds new subtitle to current project
        .then(projectDocument => {

          res.status(401).json({ message: "Subtitle added" });         
          
          
        }).catch(err => next(err))
        .catch(err => next(err));
  // Rendering index as placeholder
  res.render('index');  
});

/*******************************************************
 * 
 *                   GET ROUTES
 * 
 * *****************************************************/

 subtitleRouter.delete('/:subId/delete-sub', (req,res,next) => {
  let thisSub = req.params.subId;
  console.log(thisSub);

 });

module.exports = subtitleRouter;