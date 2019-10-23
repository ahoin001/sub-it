const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO Have these commented so I don't have to fill EVERY key in postman

const subtitleProjectSchema = new Schema({
  videoURL: {
    type: String
   },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  title: {
    type: String,
    // required: true,
    minlength: 2
  },
  genre: {
    type: String,
    // required: true,
    minlength: 2
  },
  description: {
    type: String,
    // required: true,
    minlength: 2
  },
  createdBy: {
    type: String,
    // required: true,
    minlength: 2
  },
  language: {
    type: String,
    // required: true,
    minlength: 2
  },

},

  {
    timestamps: true
  });

// "Project" model --> "projects" collection
const SubtitleProject = mongoose.model("SubtitleProject", subtitleProjectSchema);
module.exports = SubtitleProject;


