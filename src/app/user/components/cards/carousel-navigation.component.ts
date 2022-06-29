import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/core/models/card';
import { LoginService } from 'src/app/core/services/login.service';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
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

  constructor(
    private user: UserService,
    private login: LoginService,
    private router: Router,
    private modalService: NgbModal
    ) {
    
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
      error: err => {
        if (err.status == 403){
          this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
          this.login.logout()
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 3000)
        } else {
          this.showModal(`Erro de comunicação com o servidor!`, 'Tentar novamente', 'Erro ao carregar cartões')
        }
      }
    })
  }

  flipCard(){
    if (this.flip === 'flip') this.flip = ''
    else this.flip = 'flip' 
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }

}

