import { Component, OnInit, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  myVideo:any;
  private headers = new Headers({'Content-Type': 'application/json'});
  private hostUrl = 'http://localhost:8080';

  private curr_time = new Date();
  private socket:any;
  constructor(private elRef:ElementRef) { }

  ngOnInit() {
    let observable = new Observable(observer => { 
      this.socket = io(this.hostUrl);
      this.socket.emit('foo','fuck');
      this.socket.on('bar', (data) => { 
        //console.log(data);
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }; 
    }).subscribe((data)=>{
        console.log("wow: "+ data);
        if(data =="play"||data=="pause")
            this.playPause();
    })
   }

  ngAfterViewInit() {
    this.myVideo = this.elRef.nativeElement.querySelector('video');
    //console.log(this.myVideo);
  }

  // for transcluded content
  ngAfterContentInit() {
    this.myVideo = this.elRef.nativeElement.querySelector('video');
    console.log(this.myVideo);
  }
  
  playPauseEmit(){
    if (this.myVideo.paused){ 
        this.socket.emit('foo','play')
    }else{
        this.socket.emit('foo','pause');
    } 
  }

  playPause() { 
    if (this.myVideo.paused){
          this.myVideo.play(); 
      }else{
          this.myVideo.pause();
      } 
  } 
  
  makeBig() { 
      this.myVideo.width = 560; 
  } 
  
  makeSmall() { 
      this.myVideo.width = 320; 
  } 
  
  makeNormal() { 
      this.myVideo.width = 420; 
  } 

}
