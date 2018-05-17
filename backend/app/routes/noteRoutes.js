var Note = require("../models/note");
var Reminder = require("../models/reminder");
var Task = require("../models/task");
var express = require('express');

var app = module.exports = express.Router();
var path = require("path");

/* notes */

  app.get("/api/notes", (req, res) => {
    var query = Note.find();
    query.exec(function(err, noteArray) {
      console.log(noteArray);
      res.json(noteArray);
    });

  });

  app.post("/api/note", (req, res) => {

    console.log(req.body);
    var newNote = new Note();

    // set the user"s local credentials
    newNote.content = req.body.content;
    newNote.timestamp = new Date();
    newNote.archived = false;

    console.log(newNote);

    // save the user
    newNote.save(function(err) {
        if (err)
            throw err;
        res.status(200).send(newNote);
    });

  });

  app.get("/api/notes/recent", (req, res) => {
    var query = Note.find().sort('-_id').limit(10);
    query.exec(function(err, noteArray){
      console.log(noteArray);
      res.json(noteArray);
    });
  })

  app.put('/api/notes/archive/:id', (req,res) => {
    var query = Note.findOne({_id:req.body.id});
    query.exec(function(err, found){
      found.archived=!found.archived;
      found.save(function(err){
        res.status(200).send(found);
      });
    });
});

/* task */
app.get("/api/tasks", (req, res) => {
  var query = Note.find();
  query.exec(function(err, taskArray) {
    console.log(taskArray);
    res.json(taskArray);
  });

});

app.post("/api/task", (req, res) => {

  console.log(req.body);
  var newTask = new Task();

  // set the user"s local credentials
  newTask.title = req.body.title;
  newTask.expectedTime = req.body.expectedTime;
  newTask.samples = req.body.samples;

  console.log(newTask);

  // save the user
  newNote.save(function(err) {
      if (err)
          throw err;
      res.status(200).send(newTask);
  });

});
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../dist/index.html"));
  });

