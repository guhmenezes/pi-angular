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
  // images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  cards:any[] = [];
  flip = 'flip'

  constructor(config: NgbCarouselConfig,
    private service: LoginService) {
    
  }

  ngOnInit(): void {
    this.retrieveCards()
  }

  retrieveCards(){
    this.service.getCards(window.localStorage.getItem('userId')!).subscribe(response => {
      console.log(response.length)
      for(let i = 0; i< response.length; i++){
        // this.service.getInfoCard(response[i].idPromocao)
        this.cards.push(response[i]);
      }
      if (response.length <= 1){
        this.showNavigationArrows = false;
        this.showNavigationIndicators = false;
      }
      console.log(this.cards)})
    }

    flipCard(){
      for(let i=0; i<this.cards.length; i++) {
        // if(this.cards[i].id === id) {
            // achou!
            // console.log(cards)
            if (this.flip === 'flip') this.flip = ''
            else this.flip = 'flip' 
        // }
    }
  }
}

