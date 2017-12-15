var mongoose = require("mongoose");

var noteSchema = mongoose.Schema({
  content : String,
  timestamp : Date,
  archived: Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Note", noteSchema);
