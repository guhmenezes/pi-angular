import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/core/models/card';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from '../../services/user.service';

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
  userId!:string;

  card = new Card()

  constructor(config: NgbCarouselConfig,
    private user: UserService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.userId = this.user.getId()
    this.retrieveCards()
  }

  retrieveCards(){
    this.user.getCards(this.userId).subscribe({
      next: response => {
      console.log(response.length)
      for(let i = 0; i< response.length; i++){
        // this.service.getInfoCard(response[i].idPromocao)
        // this.cards.push(response[i]);
        this.card = response[i]
        this.cards.unshift(this.card)
        console.log(this.card,this.cards)
      }
      if (response.length <= 1){
        this.showNavigationArrows = false;
        this.showNavigationIndicators = false;
      } else if(response.length > 3){
        while(this.cards.length > 3)
        this.cards.reverse().pop()
        this.cards.reverse()
      }
      console.log(this.cards)
      },
      // error: () => {
      //   console.log('erro request')
      //   this.router.navigate(['/error'])
      // }
    })
    }

    flipCard(){
      // for(let i=0; i<this.cards.length; i++) {
        // if(this.cards[i].id === id) {
            // achou!
            // console.log(cards)
            if (this.flip === 'flip') this.flip = ''
            else this.flip = 'flip' 
        // }
    // }
  }
}

