import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  newConsumer!: string;
  idConsumer!: string; //request
  empresaId!: string;
  idPromocao!: string; //localstorage request
  espacoTotal!: string;
  alreadyHave = true

  constructor(
    private reg: RegisterService, 
    // private info: UserService,
    private user: UserService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.user.getInfo().username?.length != 14) this.router.navigate(['/'])
    // this.empresaId = window.localStorage.getItem('userId')!
    // console.log(this.empresaId)
    this.idPromocao = window.localStorage.getItem('havePromo')!
    this.espacoTotal = window.localStorage.getItem('carimbos')!
    // this.getCampaignId(this.empresaId)
    // console.log(this.promocaoId)
    // this.haveThisCard(this.newConsumer)
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }


  // getCampaignId(id:string){
  //   this.info.getAllPromo().subscribe({
  //     next: promo => {
  //       console.log(promo[0].promocaoId)
  //       this.promocaoId = promo[0].promocaoId!
  //     }
  //   })
  // }

  //FUNCAO CONFERIR SE JA POSSUI O CARTAO
  haveThisCard(id:string){
    let have = false
    this.user.getCards(id).subscribe(
      response => {
      for(let i = 0; i < response.length; i++){
        if (response[i].idPromocao === this.idPromocao){
          console.log('ja possui')
          have = true
        } else {
          console.log('senta a bota')
          have = false
        }
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
    // } else if (!window.localStorage.getItem('token')){
      // this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
      // setTimeout(() => {
      //   this.info.isntAuth()
      //   window.localStorage.removeItem('userId')
      //   this.router.navigate(['/'])
      //   // console.log(this.userId)
      // }, 3000)
    } else {
      let idUser!:string;
      this.user.getUser(this.newConsumer).subscribe({
        next: data => {
          idUser = data.usuarioId
          this.haveThisCard(idUser)
          setTimeout(()=> console.log(this.alreadyHave),100)

        },
        error: () => this.showModal('Usuário não encontrado')
      })
    setTimeout(() => {
      if(this.alreadyHave === true) this.showModal('Usuário já cadastrado nesta promoção')
      else if(idUser !== null){
        let body = {
      idPromocao: this.idPromocao,
      idUsuario: idUser,
      espacoTotal: +this.espacoTotal
    }
    this.reg.createCard(body).subscribe({
      next: response => {
        console.log(response)
        console.log(body)
        this.showModal('Cartão Gerado com Sucesso')
        setTimeout(() => this.router.navigate(['/dashboard']),3000)
      },
      error: err => {
        console.log(body)
        console.log(`Erro ao criar nova promoção ${err.status}`)
        if(err.status == 403){
          this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
          setTimeout(() => {
            window.localStorage.removeItem('token')
            this.router.navigate(['/'])
            // console.log(this.userId)
          }, 3000)
        }
        this.showModal('Erro de comunicação com o servidor')
      }
  })
}
},1000)

    }
  }

}
