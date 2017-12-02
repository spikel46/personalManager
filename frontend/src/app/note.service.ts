import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NoteService {

  constructor(private http: Http) { }
  private headers = new Headers({'Content-Type': 'application/json'});
  private hostUrl = 'http://localhost:8080';
  private notePostUrl = '/api/note';
  private notesGetUrl = '/api/notes';
  private recentNotesUrl = '/api/notes/recent';
  result:any;

  getNotes() {
    var url = this.hostUrl+this.notesGetUrl;
    return this.http.get(url);
  }

  getRecentNotes() {
    var url = this.hostUrl+this.recentNotesUrl;
    return this.http.get(url);
  }

  postNote(formInfo) {
    console.log(JSON.stringify(formInfo));
    var url = this.hostUrl+this.notePostUrl;

    return this.http.post(url,
          JSON.stringify(formInfo),
          {headers: this.headers});
  }

}
