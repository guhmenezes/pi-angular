import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  newConsumer!: string;
  empresaId!: string;
  promocaoId!: string;
  espacoTotal!: string;

  constructor(
    private reg: RegisterService, 
    private info: LoginService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.empresaId = window.localStorage.getItem('userId')!
    console.log(this.empresaId)
    this.promocaoId = window.localStorage.getItem('activeCampaign')!
    this.espacoTotal = window.localStorage.getItem('qtyStamp')!
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


  getCampaignId(id:string){
    this.info.getAllPromo().subscribe({
      next: promo => {
        console.log(promo[0].promocaoId)
        this.promocaoId = promo[0].promocaoId!
      }
    })
  }

  //FUNCAO CONFERIR SE JA POSSUI O CARTAO
  // haveThisCard(cpf:string){
  //   this.info.getAllCards().subscribe(response => {
  //     for(let i = 0; i < 2; i++){
  //       console.log(response[i])
  //       if (response[i].promocaoId === this.promocaoId)
  //         return true
  //     }
  //     return false
  //   })
  //   }

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
      // console.log(this.haveThisCard(this.newConsumer))
      let idUser!:string;
    // this.info.getConsumer(this.newConsumer).subscribe({
    //   next: data => idUser = data.usuarioId,
    //   error: () => this.showModal('Usuário não encontrado')
    // })
    if(idUser !== null){
    setTimeout(() => {
       let body = {
      idPromocao: this.promocaoId,
      idUsuario: idUser,
      espacoTotal: +this.espacoTotal
    }
    this.reg.createCard(body).subscribe({
      next: response => {
        console.log(response)
        this.showModal('Cartão Gerado com Sucesso')
        setTimeout(() => this.router.navigate(['/login']),3000)
      },
      error: err => {
        console.log(body)
        this.showModal(`Erro ao criar nova promoção ${err.status}`)
      }
  })
},1000)
}
    }
  }

}
