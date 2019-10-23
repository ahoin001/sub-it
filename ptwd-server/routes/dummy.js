const express = require('express');
const dummyRouter  = express.Router();
const Dummy = require('../models/Dummy');

// require dummy model
const User = require("../models/User");

// Test get route to pull user object id
dummyRouter.get('/dummyroute', (req,res,next) => {  
  console.log('this is the current user ID: ' + req.user._id);  
  res.render('index');
});


// Test post route to create collections in database, adding the current user id
dummyRouter.post("/createdummy", (req, res, next) => {

  console.log("frontend form data: ", req.body);

  const { userId = req.user._id, dummyName } = req.body;


  Dummy // change to dummy 
  .create({ userId, dummyName }) //creates new dummy in DB with this info
  .then( userDoc => { 

    // 

   

   } )
  .catch( err => next(err) ); // close Dummy.create()
});

module.exports = dummyRouter;