const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/
  },
  encryptedPassword: {
    type: String,
    required: true
  }, 
  // TODO TEST 
  //RELATIONAL DATA, EACH USER CAN HAVE MULTIPLE CAPTION OR MULTIPLE SUBTITLE PROJECTS
  subtitleProjects: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'SubtitleProject'
  }],
  captionProjects: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'CaptionProject'
  }]
},
  {
    timestamps: true
  });

// "User" model --> "users" collection
const User = mongoose.model("User", userSchema);
module.exports = User;


// module.exports = mongoose.model("User", userSchema);;



