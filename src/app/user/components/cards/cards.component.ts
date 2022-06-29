import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

havePromo = false;
  
  constructor(private user: UserService, private router: Router) { }
  
  ngOnInit(): void {

    if(this.user.getInfo().username?.length != 11) this.router.navigate(['/'])
    if(!window.localStorage.getItem('noActive'))
    this.havePromo = this.user.havePromo()
    
  }
  
}
