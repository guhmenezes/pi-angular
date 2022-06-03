import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clube-de-vantagens';
  fontSize = document.getElementsByClassName('container-xxl');
  ngOnInit(): void {
    
    console.log(this.fontSize)
  }
}
