import { Component, OnInit } from '@angular/core';

import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  contentStr:string;
  dateStr:string;
  timeStr:string;

  reminders:Reminder[];
  ret_Reminder:Reminder;

  constructor(private reminderService:ReminderService) { }

  ngOnInit() {
    this.reminders = new Array();
    this.getReminders();
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
    console.log(currentTime.toLocaleString())
    var ret_Reminder = {
                          note: { "content":this.contentStr,
                                  "timestamp":currentTime,
                                  "archived":false
                                },
                          deadline: deadline
                        };
    console.log(ret_Reminder);
    this.reminderService.postReminder(ret_Reminder)
        .map(res => res.json())
        .subscribe(newReminder => {
          this.setTimeouts(newReminder);
          this.reminders.push(newReminder);
        });
    this.contentStr="";
  }

  getReminders(){
    this.reminderService.getReminders()
        .map(oldReminders => oldReminders.json())
        .subscribe(data => {
          this.setTimeoutArray(data);
          this.reminders = data;
        });
  }

  setTimeoutArray(reminderArray){
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

  setTimeouts(reminder){
    var content;
    var timer;
    content = reminder.note.content;
    timer = this.calculateTime(new Date(reminder.deadline));
    console.log(timer);
    if(timer > 0)
      setTimeout(()=>alert(content),timer);
  }

  calculateTime(deadline){
    var now:any = new Date();
    return deadline-now;
  }

}
