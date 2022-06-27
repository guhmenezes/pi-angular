import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  newConsumer!: string;
  idConsumer!: string;
  empresaId!: string;
  idPromocao!: string;
  espacoTotal!: string;
  alreadyHave = true

  constructor(
    private reg: RegisterService, 
    private login: LoginService,
    private user: UserService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {

    if(this.user.getInfo().username?.length != 14) this.router.navigate(['/'])
    this.idPromocao = window.localStorage.getItem('havePromo')!
    this.espacoTotal = window.localStorage.getItem('carimbos')!
    
  }

  haveThisCard(id:string){
    let have = false
    this.user.getCards(id).subscribe(
      response => {
      for(let i = 0; i < response.length; i++){
        if (response[i].idPromocao === this.idPromocao) have = true
      }
      this.alreadyHave = have
      }
    )
  }

  generateCard():void{

    if(!this.newConsumer){
      this.showModal('Insira o CPF do novo cliente')
    } else if(this.newConsumer.length !== 11 || !this.reg.isCpfValid(this.newConsumer)){
      this.showModal('CPF inválido. Tente novamente')
    } else {
      let idUser!:string;
      this.user.getUser(this.newConsumer).subscribe({
        next: data => {
          idUser = data.usuarioId
          this.haveThisCard(idUser)
        },
        error: err => {
          if (err.status == 403){
            this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
            this.login.logout()
            setTimeout(() => {
              this.router.navigate(['/'])
            }, 3000)
          } else {
            this.showModal('Usuário não encontrado')
          }
        }
      })
      setTimeout(() => {
      if(this.alreadyHave === true) this.showModal('Usuário já cadastrado nesta promoção')
      else if(idUser !== null){
        let body = {
          idPromocao: this.idPromocao,
          idUsuario: idUser,
          espacoTotal: +this.espacoTotal
        }
      this.user.createCard(body).subscribe({
      next: () => {
        this.showModal('Cartão Gerado com Sucesso')
        setTimeout(() => this.router.navigate(['/dashboard']),3000)
      },
      error: err => {
        if(err.status == 403){
          this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
          this.login.logout()
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 3000)
        } else {
        this.showModal(`Erro de comunicação com o servidor! ${err.message}`, 'Tentar novamente', 'Erro ao gerar cartão')
        }
      }
      })
      }
      },1000)

    }
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }

}
