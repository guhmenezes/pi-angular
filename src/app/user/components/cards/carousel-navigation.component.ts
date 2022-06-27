import {Component, OnInit} from '@angular/core';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/core/models/card';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngbd-carousel-navigation',
  templateUrl: 'carousel-navigation.component.html',
  styleUrls: ['cards.component.css'],
  providers: [NgbCarouselConfig]
})
export class NgbdCarouselNavigation implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = true;
  cards:any[] = [];
  flip = 'flip'
  userId!:string;
  card = new Card()

  constructor(private user: UserService) {
    
  }

  ngOnInit(): void {

    this.userId = this.user.getId()
    this.retrieveCards()
    
  }

  retrieveCards(){
    this.user.getCards(this.userId).subscribe({
      next: response => {
      for(let i = 0; i< response.length; i++){
        this.card = response[i]
        this.cards.unshift(this.card)
      }
      if (response.length <= 1){
        this.showNavigationArrows = false;
        this.showNavigationIndicators = false;
      } else if(response.length > 3){
        while(this.cards.length > 3)
        this.cards.reverse().pop()
        this.cards.reverse()
      }
      },
    })
  }

  flipCard(){
    if (this.flip === 'flip') this.flip = ''
    else this.flip = 'flip' 
  }

}

