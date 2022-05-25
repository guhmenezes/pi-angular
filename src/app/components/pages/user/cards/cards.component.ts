import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Card[] = [];
  flip = 'flip'
  
  constructor(private service: LoginService) { }
  
  ngOnInit(): void {
    this.retrieveCards()
  }
  
  retrieveCards(){
    this.service.getAllCards().subscribe(response => {
      for(let i = 0; i<=1; i++){
        this.cards.push(response[i]);
      }
      console.log(this.cards)})
    }
  
  flipCard(){
    if (this.flip === 'flip') this.flip = ''
    else this.flip = 'flip'
  }
}
