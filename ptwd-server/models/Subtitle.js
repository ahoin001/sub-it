const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubtitleSchema = new Schema ({

  projectId: {
    type: String,
    required: true
  },
  inTime: {
    type: String,
    required: true
  },
  outTime: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }

});

const Subtitle = mongoose.model("Subtitle", ProjectSubtitle);
module.exports = Subtitle;