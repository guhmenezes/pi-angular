import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit {

  cpf!: string;
  qtd!: any;
  promocaoId!: string; //localstorage
  stampCode!: string;
  alreadyHave = false;

  constructor(
    private reg: RegisterService,
    private user: UserService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.user.getInfo().username?.length != 14) this.router.navigate(['/'])
    this.promocaoId = window.localStorage.getItem('havePromo')!
    console.log(this.promocaoId)
  }

  onSubmit(form: NgForm){
    console.log(form.value)
    this.cpf = form.value.cpf
    this.qtd = form.value.qtd
    this.stampCard(form)
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }

  haveThisCard(id:string){
    let have = false
    this.user.getCards(id).subscribe(
      response => {
      for(let i = 0; i < response.length; i++){
        if (response[i].idPromocao === this.promocaoId){
          console.log('ja possui')
          have = true
        } else {
          console.log('senta a bota')
        }
      }
      this.alreadyHave = have
    }
  )
}
  
  stampCard(form: NgForm):void{
    console.log(this.qtd, this.cpf)
    if(!form.value.cpf){
      this.showModal('Insira o CPF do cliente para carimbar o cartão')
    } else if(form.value.cpf.length !== 11 || !this.reg.isCpfValid(form.value.cpf)){
      this.showModal('CPF inválido. Tente novamente')
    } else if(!form.value.qtd){
      this.showModal('Informe a quantidade de carimbos que o cartão receberá')
    // } else if (!this.promocaoId){
    //   this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
    //   setTimeout(() => {
    //     this.log.isntAuth()
    //     window.localStorage.removeItem('userId')
    //     this.router.navigate(['/'])
    //     console.log(this.promocaoId)
    //   }, 3000)
    } else {
    let body = {
      idPromocao: this.promocaoId,
      cpf: this.cpf,
      qtdCarimbos: +this.qtd
    }
    this.reg.stampCard(body).subscribe({
      next: response => {
        this.user.getUser(this.cpf).subscribe({
          next: data => {
            let idUser = data.usuarioId
            this.haveThisCard(idUser)
            setTimeout(()=> console.log(this.alreadyHave),100)
          },
          error: () => this.showModal('Erro')
        })
        setTimeout(() => {
          if(this.alreadyHave == false){
            this.showModal('Usuário não possui cartão fidelidade')
          } else {
        console.log(response)
        this.showModal('Escaneie o QR-Code ou clique sobre ele')
        this.stampCode = response.urlCarimbo.replace('http://localhost:8181/v1/stampcard/','')
        form.reset()
        // this.cpf = ''
        // this.qtd = ''
        // this.router.navigate(['/stamp'])
        // setTimeout(() => this.router.navigate(['/login']),3000)
          }
        },100)
      },
      error: err => {
        if (err.status == 403){
          this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
          setTimeout(() => {
            this.router.navigate(['/'])
          //   console.log(this.userId)
          }, 3000)
        } else {
        console.log(body)
        this.stampCode = 'hjah'
        this.showModal(`Erro de comunicação com o servidor! ${err.message}`, 'Tentar novamente', 'Cartão não carimbado')
        }
      }
    })
  }
}
}
