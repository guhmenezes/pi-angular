import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  zoomIn(){
    let fontSize = document.getElementsByTagName('body')[0].style.fontSize;
    console.log(fontSize)
  }

}
