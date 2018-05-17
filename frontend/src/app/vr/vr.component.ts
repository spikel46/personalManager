import { Component, OnInit, ElementRef } from '@angular/core';
import 'aframe';

@Component({
  selector: 'app-vr',
  templateUrl: './vr.component.html',
  styleUrls: ['./vr.component.css']
})
export class VrComponent implements OnInit {

  elem: any;
  aframe: any;
  timeout: any;
 

  constructor(ref: ElementRef) {
      this.elem = ref.nativeElement;
  }

  ngOnInit() {
      this.aframe = this.elem.querySelector('a-scene');
}

}
