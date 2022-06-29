import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit {

  cpf!: string;
  qtd!: any;
  promocaoId!: string;
  stampCode!: string;
  alreadyHave = false;

  constructor(
    private reg: RegisterService,
    private login: LoginService,
    private user: UserService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {

    if(this.user.getInfo().username?.length != 14) this.router.navigate(['/'])
    this.promocaoId = window.localStorage.getItem('havePromo')!
    
  }

  onSubmit(form: NgForm){
    this.cpf = form.value.cpf
    this.qtd = form.value.qtd
    this.stampCard(form)
  }

  haveThisCard(id:string){
    let have = false
    this.user.getCards(id).subscribe(
      response => {
      for(let i = 0; i < response.length; i++){
        if (response[i].idPromocao === this.promocaoId) have = true
      }
      this.alreadyHave = have
    }
  )
  }
  
  stampCard(form: NgForm):void{
    
    if(!form.value.cpf){
      this.showModal('Insira o CPF do cliente para carimbar o cartão')
    } else if(form.value.cpf.length !== 11 || !this.reg.isCpfValid(form.value.cpf)){
      this.showModal('CPF inválido. Tente novamente')
    } else if(!form.value.qtd){
      this.showModal('Informe a quantidade de carimbos que o cartão receberá')
    } else {

    let body = {
      idPromocao: this.promocaoId,
      cpf: this.cpf,
      qtdCarimbos: +this.qtd
    }
    this.user.stampCard(body).subscribe({
      next: response => {
        this.user.getUser(this.cpf).subscribe({
          next: data => {
            let idUser = data.usuarioId
            let stampUser = data.nome.split(' ')[0]
            stampUser = stampUser.split('')
            let firstLetter = stampUser[0].toUpperCase()
            stampUser[0] = firstLetter
            stampUser = stampUser.join('')
            window.localStorage.setItem('stampUser', stampUser)
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
              this.showModal(`Erro de comunicação com o servidor!`, 'Tentar novamente', 'Erro ao gerar carimbo')
            }
          }
        })
        setTimeout(() => {
          if(this.alreadyHave == false){
            this.showModal('Usuário não possui cartão fidelidade')
          } else {
            this.showModal('Escaneie o QR-Code ou clique sobre ele')
            this.stampCode = response.urlCarimbo.replace('http://localhost:8181/v1/stampcard/','')
            form.reset()
          }
        },2000)
      },
      error: err => {
        if (err.status == 403){
          this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
          this.login.logout()
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 3000)
        } else {
          this.showModal(`Erro de comunicação com o servidor!`, 'Tentar novamente', 'Cartão não carimbado')
        }
      }
    })
  }
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }

}
