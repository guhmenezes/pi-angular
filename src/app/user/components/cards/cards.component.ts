import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/core/models/card';
import { LoginService } from 'src/app/core/services/login.service';
import Swiper from 'swiper';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

havePromo = false;
//   cards: Card[] = [];
//   espacoTotal: number[] = [];
//   flip = 'flip'
  
  constructor(private user: UserService) { }
  
  ngOnInit(): void {
    this.havePromo = this.user.havePromo()
    // this.retrieveCards()
  }
  
//   retrieveCards(){
//     this.service.getAllCards().subscribe(response => {
//       for(let i = 0; i<=1; i++){
//         this.cards.push(response[i]);
//       }
//       console.log(this.cards)})
//     }
  
//   flipCard(id: string){
//     for(let i=0; i<this.cards.length; i++) {
//       if(this.cards[i].cartaoId === id) {
//           // achou!
//           // console.log(cards)
//           if (this.flip === 'flip') this.flip = ''
//           else this.flip = 'flip' 
//       }
//   }
// }

//   swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,
  
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
  
//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   });
}
