var mongoose = require("mongoose");

var noteSchema = mongoose.Schema({
  content : String,
  expectedTime: Number,
  samples: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Task", noteSchema);
