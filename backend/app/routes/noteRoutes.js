var Note = require("../models/note");
module.exports = function(app) {

  var path = require("path");

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

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../dist/index.html"));
  });

};
