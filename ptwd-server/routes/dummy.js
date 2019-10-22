const express = require('express');
const dummyRouter  = express.Router();

// require dummy model
const User = require("../models/User");

dummyRouter.get('/dummyroute', (req,res,next) => {
  console.log(req.body);
  res.render('index');
});

dummyRouter.post("/createdummy", (req, res, next) => {

  console.log("frontend form data: ", req.body);

  const { fullName, email } = req.body;


  User  // change to dummy 
   .create({ fullName, email }) //creates new dummy in DB with this info
  .then( userDoc => { 

    // 

   

   } )
  .catch( err => next(err) ); // close User.create()
});

module.exports = dummyRouter;