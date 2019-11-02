const express = require('express');
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
  const {projectId = req.params.projectId, inTime, outTime, text } = req.body;
  Subtitle
        .create({projectId, inTime, outTime, text }) //adds new subtitle to current project
        .then(projectDocument => {    
          
          let thisProjectID = projectDocument.projectId;         
          Project
            .findByIdAndUpdate(thisProjectID, { $push: {subtitleArray: projectDocument}})
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

  let subID = req.params.subId;
  const { inTime, outTime, text } = req.body;
  
  Subtitle
    .findByIdAndUpdate(subID, { $set: { inTime, outTime, text }})
    .then(projectDocument => {
      res.status(200).json({ message: 'You updated this sub'})
    })
    .catch(err);
 
 });

/*******************************************************
 * 
 *                   DELETE ROUTES
 * 
 * *****************************************************/

 subtitleRouter.delete('/:subId/delete-sub', (req,res,next) => {
  let subID = req.params.subId;

  Subtitle
    .findByIdAndDelete(subID)
    .then(projectDocument => {
      res.status(200).json({ message: 'Subtitle deleted: ' + projectDocument._id + ' from the project: ' + projectDocument.projectId});
        Project
        .findOneAndUpdate( { '_id': projectDocument.projectId}, { $pull: {'subtitleArray.projectId': { $eq: 'projectDocument._id'}}})
        .then(project => {
          res.status(200).json({ message: 'this is the full project array: ' + project.subtitleArray});
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
 });

// TODO: slice (splice?) subtitle from project array

module.exports = subtitleRouter;