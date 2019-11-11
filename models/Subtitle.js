const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubtitleSchema = new Schema ({

  projectId: {
    type: String,
    required: true
  },
  inTime: {
    type: Number,
    required: true
  },
  outTime: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },  
  inTimeVTT: {
    type: String,
    required: true
  },
  outTimeVTT: {
    type: String,
    required: true
  }

});

const Subtitle = mongoose.model("Subtitle", SubtitleSchema);
module.exports = Subtitle;