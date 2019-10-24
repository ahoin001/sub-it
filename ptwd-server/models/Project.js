const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO Have these commented so I don't have to fill EVERY key in postman

const ProjectSchema = new Schema({


  userId: {
    type: String
    // required: true
  },
  videoURL: {
    type: String
  },
  title: {
    type: String
    // required: true,
    // minlength: 2
  },
  genre: {
    type: String
    // required: true,
    // minlength: 2
  },
  description: {
    type: String
    // required: true,
    // minlength: 2
  },
  createdBy: {
    type: String
    // required: true,
    // minlength: 2
  },
  language: {
    type: String
    // required: true,
    // minlength: 2
  },

},

  {
    timestamps: true
  });

// "Project" model --> "projects" collection
const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;


