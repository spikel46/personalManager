import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  private _item:any;

  // The below does not work: you get Typescript compile error:  error TS1049: A 'set' accessor must have exactly one parameter.
  // private oldHero = 'None';
  // @Input() set hero(value: Hero, oldValue: Hero) {
  //   this._hero = value;
  //   this.oldHero = oldValue.name;
  // }

  // Alan: Use input property setter
  @Input() set item(value) {
    this._item = value;
    this.myStr = JSON.stringify(this._item);
  }

  myStr: String;
  sub:any;
  constructor() {}

  ngOnInit() {
    this.myStr = JSON.stringify(this._item);
  }



}
