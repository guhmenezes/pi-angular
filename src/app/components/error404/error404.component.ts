import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor(private router: Router, private login: LoginService) { }

  ngOnInit(): void {
    setTimeout(() => this.toIndex(), 3000)
  }

  toIndex(){
    console.log(this.login.isAuth())
    if(this.login.isAuth())
    this.router.navigate(['/login'])
    else
    this.router.navigate(['/'])
  }
}
