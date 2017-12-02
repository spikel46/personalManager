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
  ret_Note:Note;

  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.notes = new Array();
  }

  createNote(){
    var ret_Note={"content":this.contentStr};
    console.log(ret_Note);
    this.noteService.postNote(ret_Note)
        .map(res => res.json())
        .subscribe(newNote => this.notes.push(newNote.data));
  }
/*
  getChats(): void {
    this.noteService.getOldNotes()
        .map(oldNotes => oldNotes.json())
        .subscribe(data => console.log(data));
  }*/

  /*getChatStream():void {
    this.connection = this.chatsService.getChatStream(this.id)
      .subscribe(message => { this.chats.push(message); })
  }*/

}
