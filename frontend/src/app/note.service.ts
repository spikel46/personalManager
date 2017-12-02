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
  result:any;

  postNote(formInfo) {
    console.log(JSON.stringify(formInfo));
    var url = this.hostUrl+this.notePostUrl;

    return this.http.post(url,
          JSON.stringify(formInfo),
          {headers: this.headers});
  }

}
