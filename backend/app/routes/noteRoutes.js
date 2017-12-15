var Note = require("../models/note");
var Reminder = require("../models/reminder");
module.exports = function(app) {

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
  })


  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../dist/index.html"));
  });

};
