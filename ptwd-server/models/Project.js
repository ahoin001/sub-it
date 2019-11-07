const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
    // required: true
  },
  subtitleArray: {
    type: Array
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
  language: {
    type: String
    // required: true,
    // minlength: 2
  },createdBy: {
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


