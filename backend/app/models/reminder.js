var mongoose = require("mongoose");

var reminderSchema = mongoose.Schema({
  note: {
          content: String,
          timestamp: Date
        },
  deadline: Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Reminder", reminderSchema);
