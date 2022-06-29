import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Card } from 'src/app/core/models/card';
import { LoginService } from 'src/app/core/services/login.service';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
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

  constructor(
    private user: UserService, 
    private router: Router,
    private modalService: NgbModal,
    private login: LoginService
    ) { }

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
        },
      error: err => {
        if (err.status == 403){
          this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
          this.login.logout()
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 3000)
        } else {
          this.showModal(`Erro de comunicação com o servidor!`, 'Tentar novamente', 'Erro ao carregar promoções')
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

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }
}
