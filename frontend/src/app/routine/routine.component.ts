import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {

  routineOne:any[];
  taskNumber:number;

  constructor() {
    this.routineOne = [
      {
        id:1,
        title: "cook",
        expectedTime:10,
        samples:1
      },{
        id:2,
        title: "eat",
        expectedTime:10,
        samples:1
      },
      {
        id:3,
        title: "dishes",
        expectedTime:10,
        samples:1
      },
      {
        id:4,
        title: "brush teeth",
        expectedTime:10,
        samples:1
      },
      {
        id:5,
        title: "read",
        expectedTime:60,
        samples:1
      }
    ];
  }

  ngOnInit() {
    this.taskNumber = 0;
  }

  nextTask(){
    this.taskNumber += 1;
    //get time
    //add to expected time * samples
    //add 1 to samples
    console.log(this.taskNumber);
  }

}
