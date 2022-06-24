import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/core/models/card';
import { Promo } from 'src/app/core/models/promo';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-campaign',
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

  constructor(private user: UserService) { }

  ngOnInit(): void {
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
    // this.service.getAllPromo().subscribe(response => {
    //   for(let i = 0; i<=2; i++){
    //   this.promoList.push(response[i]);
    //   this.validade = Date.parse(response[i].dataValidade)
    //   console.log(this.validade)
    //   }
    //   console.log(this.promoList)
    //   console.log(this.date)
  
    // })
    this.user.getCards(this.userId).subscribe({
      next: response => {
        // this.havePromo = false
        for(let i = 0; i< response.length; i++){
          this.promoList.unshift(response[i]);
          this.validade = Date.parse(response[i].validade)
          console.log(this.validade)
          }
          console.log(this.promoList)
          console.log(this.date)
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
