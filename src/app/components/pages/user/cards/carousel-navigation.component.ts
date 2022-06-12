import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/models/card';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'ngbd-carousel-navigation',
  templateUrl: 'carousel-navigation.component.html',
  styleUrls: ['cards.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class NgbdCarouselNavigation implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = true;
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  cards: Card[] = [];
  flip = 'flip'

  constructor(config: NgbCarouselConfig,
    private service: LoginService) {
    
  }

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

    flipCard(id: string){
      for(let i=0; i<this.cards.length; i++) {
        if(this.cards[i].cartaoId === id) {
            // achou!
            // console.log(cards)
            if (this.flip === 'flip') this.flip = ''
            else this.flip = 'flip' 
        }
    }
  }
}

