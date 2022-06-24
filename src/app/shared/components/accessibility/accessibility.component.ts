import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent implements OnInit {

  fontSize = window.getComputedStyle(document.querySelector('html')!).getPropertyValue('font-size')
  zoom = 12
  dark = false;
  
  constructor() { }

  ngOnInit(): void {
    if(window.localStorage.getItem('fontSize')){
      this.fontSize = window.localStorage.getItem('fontSize')!
      this.zoom = +this.fontSize.split('p')[0]
    }
    document.querySelector('html')?.style.setProperty('--font-size', this.fontSize)
    this.dark = window.localStorage.getItem('dark') == 'true'!
    if (this.dark)
    document.body.classList.add('dark-theme') 
  }
  
  toggleTheme() { 
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme'))
    window.localStorage.setItem('dark', 'true')
    else window.localStorage.setItem('dark', 'false')
  }
  
  zoomIn(){
    if(this.zoom >= 20) this.zoom = 12
    else 
    this.zoom += 4
    {
    this.fontSize = `${this.zoom}px`
    document.querySelector('html')?.style.setProperty('--font-size', this.fontSize)
    window.localStorage.setItem('fontSize', this.fontSize)
  }
}

}
