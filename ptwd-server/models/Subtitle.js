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
  },
  // add inTimeMS and outTimeMS with converted time into milliseconds, to sort array and display

});

const Subtitle = mongoose.model("Subtitle", SubtitleSchema);
module.exports = Subtitle;