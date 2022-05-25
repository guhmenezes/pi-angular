import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/models/promo';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  promoList: Promo[] = [];
  date: number | Date = new Date(Date.now());
  validade: number | Date =new Date();

  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.retrievePromo()
  }

  compare(date1: string, date2: number | Date, tipo:boolean){
    let promoDate: number = Date.parse(date1)
    if (tipo)
      if (promoDate >= date2) return true
    if (!tipo)
    if (promoDate <= date2) return true
    return false
  }

  retrievePromo(){
    this.service.getAllPromo().subscribe(response => {
      for(let i = 0; i<=1; i++){
      this.promoList.push(response[i]);
      this.validade = Date.parse(response[i].dataValidade)
      console.log(this.validade)
      }
      console.log(this.promoList)
      console.log(this.date)
  
    })
  }
}
