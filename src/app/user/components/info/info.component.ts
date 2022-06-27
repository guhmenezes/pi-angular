import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  username: string = '';
  nome!: string;
  email!: string;
  telefone!: string;


  constructor(
    private user: UserService, 
    private router: Router, 
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    if(this.user.getInfo().username?.length != 11) this.router.navigate(['/'])
      let data = this.user.getInfo()
    if(data.id && data.nome && data.email && data.telefone){
      this.nome = data.nome!.toUpperCase()
      this.email = data.email!
      this.telefone = data.telefone!
    } else {
      this.showModal('Erro ao carregar dados !')
      setTimeout(()=>
      this.router.navigate(['/'])
      , 3000)
    }
    
  }

  updateData():void{
    // this.user.email = this.email;
    // this.user.telefone = this.telefone;
    // this.reg.editConsumer(this.user.cpf, this.user)
    // console.log(this.user)
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }
}
