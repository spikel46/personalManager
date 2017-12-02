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
    this.getChats();
  }

  createNote(){
    var ret_Note={"content":this.contentStr};
    console.log(ret_Note);
    this.noteService.postNote(ret_Note)
        .map(res => res.json())
        .subscribe(newNote => this.notes.push(newNote));
  }

  getChats(): void {
    this.noteService.getOldNotes()
        .map(oldNotes => oldNotes.json())
        .subscribe(data => this.notes = data);
  }

  /*getChatStream():void {
    this.connection = this.chatsService.getChatStream(this.id)
      .subscribe(message => { this.chats.push(message); })
  }*/

}
