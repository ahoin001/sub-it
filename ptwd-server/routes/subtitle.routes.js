const express = require('express');
const mongoose = require('mongoose');
const subtitleRouter = express.Router();
const Subtitle = require("../models/Subtitle");
const Project = require('../models/Project');

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
  console.log("this is getting called <<<<<<<<<<<<<< ");
  const {projectId = req.params.projectId, inTime, outTime, text, inTimeMS, outTimeMS, inTimeVTT, outTimeVTT } = req.body;
  Subtitle
        .create({projectId, inTime, outTime, text, inTimeMS, outTimeMS, inTimeVTT, outTimeVTT }) //adds new subtitle to current project
        .then(projectDocument => {    
          
          let thisProjectID = projectDocument.projectId;         
          Project
            .findByIdAndUpdate(thisProjectID, { $push: {subtitleArray: projectDocument._id}})
            .then(project => {              
              console.log(project.subtitleArray);
            })
            .catch(err => next(err))
        })
        .catch(err => next(err));
});

/*******************************************************
 * 
 *                   PUT ROUTES
 * 
 * *****************************************************/

 subtitleRouter.put('/:subId/edit-sub', (req,res,next) => {
console.log("never mind, this is whats actually getting called <<<<<<<<<<<<<<<<<")
  let subID = req.params.subId;  
  const { inTime, outTime, text, inTimeMS, outTimeMS, inTimeVTT, outTimeVTT } = req.body;
  
  Subtitle
    .findByIdAndUpdate(subID, { $set: { inTime, outTime, text, inTimeMS, outTimeMS, inTimeVTT, outTimeVTT }})
    .then(projectDocument => {
      res.status(200).json({ message: 'You updated this sub'});            
    })
    .catch(err => next(err));

 // TODO: update subtitle in project array

 });

/*******************************************************
 * 
 *                   DELETE ROUTES
 * 
 * *****************************************************/

 subtitleRouter.delete('/:subId/delete-sub', (req,res,next) => {
  let subID = req.params.subId;
  let subIDObject = mongoose.mongo.ObjectID(subID);
  let projectId = '';

  Subtitle
    .findByIdAndDelete(subID)
    .then(projectDocument => {
      projectId = projectDocument.projectId;
      res.status(200).json({ message: 'Subtitle deleted: ' + projectDocument._id + ' from the project: ' + projectDocument.projectId}); 
      Project
        .findByIdAndUpdate(projectId, { $pull: { subtitleArray : {_id: subIDObject}}})
        .then(project => {})
        .catch(err => next(err));     
    })
    .catch(err => next(err));
 });


module.exports = subtitleRouter;