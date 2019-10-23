const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dummySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    dummyName: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

// "Project" model --> "projects" collection
const Dummy = mongoose.model("Dummy", dummySchema);
module.exports = Dummy;


