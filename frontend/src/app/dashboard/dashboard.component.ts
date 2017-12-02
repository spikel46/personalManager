import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contentStr:string;

  notes:Note[];
  recentNotes:Note[];
  ret_Note:Note;

  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.notes = new Array();
    this.recentNotes = new Array(10);
    this.getRecentNotes();
    this.getNotes();
  }

  createNote(){
    var ret_Note={"content":this.contentStr};
    console.log(ret_Note);
    this.noteService.postNote(ret_Note)
        .map(res => res.json())
        .subscribe(newNote => this.notes.push(newNote));
  }

  getNotes(){
    this.noteService.getNotes()
        .map(oldNotes => oldNotes.json())
        .subscribe(data => this.notes = data);
  }

  getRecentNotes(){
    this.noteService.getRecentNotes()
        .map(recents => recents.json())
        .subscribe(data => this.recentNotes = data);
  }

}
