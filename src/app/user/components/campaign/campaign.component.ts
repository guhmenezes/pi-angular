import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Card } from 'src/app/core/models/card';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  promoList: Card[] = [];
  activeList: boolean = true;
  closedList: boolean = false;
  date: number | Date = new Date(Date.now());
  validade: number | Date =new Date();
  active: boolean = true;
  closed: boolean = false;
  havePromo = false;
  userId!: string;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {

    if(this.user.getInfo().username?.length != 11) this.router.navigate(['/'])
    
    this.userId = this.user.getId()
    this.havePromo = this.user.havePromo()
    this.retrievePromo()
    
  }

  compare(date1: string, date2: number | Date, tipo:boolean){
    let promoDate: number = Date.parse(date1)
    if (tipo)
      if (promoDate >= date2) {
        this.activeList = true
      return true
    }
    if (!tipo)
      if (promoDate <= date2) {
        this.closedList = true
        return true
  }
    return false

  }

  retrievePromo(){
    this.user.getCards(this.userId).subscribe({
      next: response => {
        for(let i = 0; i< response.length; i++){
          this.promoList.unshift(response[i]);
          this.validade = Date.parse(response[i].validade)
          }
        }
    })
  }

  showClosed(){
    if (this.closed === false){
      this.active = false;
      this.closed = true;
      document.getElementById('active')?.classList.add('fw-normal')
      document.getElementById('closed')?.classList.remove('fw-normal')
    }
  }

  showActive(){
    if (this.active === false){
      this.closed = false;
      this.active = true;
      document.getElementById('active')?.classList.remove('fw-normal')
      document.getElementById('closed')?.classList.add('fw-normal')
    }
  }
}
