import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AsyncPipe } from '@angular/common';

import { Note } from '../note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  contentStr:string;
  activeNotes:Note[];
  archivedNotes:Note[];
  ret_Note:Note;

  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.activeNotes = new Array();
    this.archivedNotes = new Array();
    this.getNotes();
  }

  createNote(){
    var ret_Note={"content":this.contentStr};
    console.log(ret_Note);
    this.noteService.postNote(ret_Note)
        .map(res => res.json())
        .subscribe(newNote => this.activeNotes.push(newNote));
    this.contentStr="";
  }

  getNotes(){
    this.noteService.getNotes()
        .map(oldNotes => oldNotes.json())
        .subscribe(data => {
          for(var i = 0; i < data.length; i++){
            if(data[i].archived)
              this.archivedNotes.push(data[i]);
            else
              this.activeNotes.push(data[i]);
          }
        });
  }

  archiveNote(id){
    console.log(id);
    this.noteService.archiveNote(id)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data._id);
          var found = false;
          var i = 0;
          var findArr;
          var pushArr;
          if(data.archived){
            findArr = this.activeNotes;
            pushArr = this.archivedNotes;
          }else{
            findArr = this.archivedNotes;
            pushArr = this.activeNotes;
          }
          pushArr.push(data);
          while(i<findArr.length && !found){
            if(data._id === findArr[i].id){
              findArr.splice(i,1);
              found = true;
            }
            i+=1;
          }
          location.reload();
        });
  }
}
