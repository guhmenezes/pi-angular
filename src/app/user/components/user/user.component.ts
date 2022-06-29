import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginService } from 'src/app/core/services/login.service';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string = ''
  cpf: string = ''
  cnpj: string = ''
  firstName: string = '';
  part: string = ''
  lastName: string = '';
  userId!:string;
  lastPromo: string[] = [];

  constructor(
    private login: LoginService, 
    private user: UserService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    this.userId = window.localStorage.getItem('id')!
    this.username = window.localStorage.getItem('username')!
    if(this.username.length == 11) this.cpf = this.username
    else if (this.username.length == 14) this.cnpj = this.username
    this.getUser()

  }
  
  getUser(){
    this.user.getUser(this.username).subscribe({
      next: data => {
        if(this.username.length == 11){
          let id = data.usuarioId
          let fullName = data.nome.split(" ");
          if (fullName.length > 1){
            if (fullName.length >= 3 && fullName[fullName.length-2].length < 4)
            this.part = fullName[fullName.length-2]
            this.firstName = fullName[0];
            this.lastName = fullName[fullName.length-1]
          } else {
            this.firstName = fullName[0]
          }
          this.user.setInfo(id, data.nome, data.email, data.telefone)
          this.getCards(id)
        } else if(this.username.length == 14){
          let id = data.id
          let fullName = data.contatoNome.split(" ");
          if (fullName.length > 1){
            if (fullName.length >= 3 && fullName[fullName.length-2].length < 4)
              this.part = fullName[fullName.length-2]
            this.firstName = fullName[0];
            this.lastName = fullName[fullName.length-1]
          } else {
            this.firstName = fullName[0]
          }
          this.user.setInfo(id, data.razaoSocial)
          this.getActivePromo(id)

        }
      },
      error: err => {
        if (err.status == 403){
          this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
          this.login.logout()
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        } else {
          this.showModal('Erro ao carregar dados', 'Tentar novamente')
          this.login.logout()
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        }
        
      }
  })
  }

  getActivePromo(responseId:string){
    this.user.getPromo(responseId).subscribe({
      next: response => {
        this.lastPromo = response[0]
        if (response.length > 0)
        this.user.setPromo(response[0].idPromocao, response[0].dataValidade, response[0].descricao, response[0].quantidadeCarimbo)
        else this.user.setPromo('false')
      }
    })
  }

  getCards(responseId:string){
    this.user.getCards(responseId).subscribe({
      next: response => {
        this.lastPromo = response[0]
        if (response.length > 0)
        this.user.setPromo(response[0].idPromocao)
        else this.user.setPromo('false')
      }
    })
  }

  logout() { 
    this.login.logout()
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }

}
