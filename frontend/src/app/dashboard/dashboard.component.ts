import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Note } from '../note';
import { NoteService } from '../services/note.service';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recentNotes:Note[];
  recentReminders:Reminder[];

  constructor(private noteService:NoteService,
  private reminderService:ReminderService) { }

  ngOnInit() {
    this.recentNotes = new Array(10);
    this.getRecentNotes();
    this.recentReminders = new Array(10);
    this.getRecentReminders();
  }

  getRecentNotes(){
    this.noteService.getRecentNotes()
        .map(recents => recents.json() as Note[])
        .subscribe(data => {
          //console.log(data);
          this.recentNotes = data;
        });
  }

  getRecentReminders(){
    this.reminderService.getRecentReminders()
        .map(recents => recents.json())
        .subscribe(data => this.recentReminders = data);
  }
}
