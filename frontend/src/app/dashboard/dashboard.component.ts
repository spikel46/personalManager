import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contentStr:string;
  dateStr:string;
  timeStr:string;

  notes:Note[];
  recentNotes:Note[];
  ret_Note:Note;

  reminders:Reminder[];
  recentReminders:Reminder[];
  ret_Reminder:Reminder;


  constructor(private noteService:NoteService,
  private reminderService:ReminderService) { }

  ngOnInit() {
    this.notes = new Array();
    this.recentNotes = new Array(10);
    this.getRecentNotes();
    this.getNotes();
    this.reminders = new Array();
    this.recentReminders = new Array(10);
    this.getRecentReminders();
    this.getReminders();
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
        .map(oldNotes => oldNotes.json() as Note[])
        .subscribe(data => {
          //console.log(data);
          this.notes = data;
        });
  }

  getRecentNotes(){
    this.noteService.getRecentNotes()
        .map(recents => recents.json() as Note[])
        .subscribe(data => {
          //console.log(data);
          this.recentNotes = data;
        });
  }

  createReminder(){
    var year = +this.dateStr.substr(0,4);
    var month = +this.dateStr.substr(5,2);
    var day = +this.dateStr.substr(8,2);
    var hour = +this.timeStr.substr(0,2);
    var minute = +this.timeStr.substr(3,2);
    console.log(year+month+day+hour+minute);
    var deadline = new Date(year,month-1,day,hour,minute);
    var currentTime = new Date();
    var ret_Reminder = {
                          note: { "content":this.contentStr,
                                  "timestamp":currentTime},
                          deadline: deadline
                        };
    console.log(ret_Reminder);
    this.reminderService.postReminder(ret_Reminder)
        .map(res => res.json())
        .subscribe(newReminder => this.reminders.push(newReminder));
  }

  getReminders(){
    this.reminderService.getReminders()
        .map(oldReminders => oldReminders.json())
        .subscribe(data => {
          this.setTimeouts(data);
          this.reminders = data;
        });
  }

  getRecentReminders(){
    this.reminderService.getRecentReminders()
        .map(recents => recents.json())
        .subscribe(data => this.recentReminders = data);
  }

  setTimeouts(reminderArray){
    console.log(reminderArray);
    var content;
    var timer;
    for(var i = 0; i < reminderArray.length; i++){
      //turn this into sending notification somehow
      content = reminderArray[i].note.content;
      //console.log(new Date(reminderArray[i].deadline));
      //console.log(new Date());
      timer = this.calculateTime(new Date(reminderArray[i].deadline));
      console.log(timer);
      if(timer > 0)
        setTimeout(()=>alert(content),timer);
    }
  }

  calculateTime(deadline){
    var now:any = new Date();
    return deadline-now;
  }
}
