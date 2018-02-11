import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReminderService {

  constructor(private http: Http) { }
  private headers = new Headers({'Content-Type': 'application/json'});
  private hostUrl = 'http://localhost:8080';
  private reminderPostUrl = '/api/reminder';
  private remindersGetUrl = '/api/reminders';
  private recentRemindersUrl = '/api/reminders/recent';
  private archiveRemindersUrl = '/api/reminders/archive/';
  result:any;

  getReminders() {
    var url = this.hostUrl+this.remindersGetUrl;
    return this.http.get(url);
  }

  getRecentReminders() {
    var url = this.hostUrl+this.recentRemindersUrl;
    return this.http.get(url);
  }

  postReminder(formInfo) {
    console.log(JSON.stringify(formInfo));
    var url = this.hostUrl+this.reminderPostUrl;

    return this.http.post(url,
          JSON.stringify(formInfo),
          {headers: this.headers});
  }

  archiveReminder(id){
    var url = this.hostUrl+this.archiveRemindersUrl+id;
    return this.http.put(url+id,
          JSON.stringify({id:id}),
          {headers: this.headers});
  }

}
