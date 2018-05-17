var Reminder = require("../models/reminder");
var express = require('express');
var app = module.exports = express.Router();

  var path = require("path");

  /*reminders*/


  app.get("/api/reminders", (req, res) => {
    var query = Reminder.find();
    query.exec(function(err, noteArray) {
      console.log(noteArray);
      res.json(noteArray);
    });

  });

  app.post("/api/reminder", (req, res) => {

    console.log(req.body);
    var reminder = new Reminder();

    // set the user"s local credentials
    reminder.note = req.body.note;
    reminder.note.timestamp= new Date();
    reminder.deadline = req.body.deadline;

    console.log(reminder);

    // save the user
    reminder.save(function(err) {
        if (err)
            throw err;
        res.status(200).send(reminder);
    });
  });

  app.get("/api/reminders/recent", (req, res) => {
    var query = Reminder.find().sort('-_id').limit(10);
    query.exec(function(err, reminderArray){
      console.log(reminderArray);
      res.json(reminderArray);
    });
  });
