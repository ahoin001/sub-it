const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

  userName: {
    type: String,
    minlength: 2
  },
  email: {
    type: String,
    unique: true,
    match: /^.+@.+\..+$/
  },
  encryptedPassword: {
    type: String,
  },

},

  {
    timestamps: true
  });

// "User" model --> "users" collection
const User = mongoose.model("User", userSchema);
module.exports = User;


// module.exports = mongoose.model("User", userSchema);;



