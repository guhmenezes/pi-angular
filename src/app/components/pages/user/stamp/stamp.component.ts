import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/components/alert-modal/alert-modal.component';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit {

  cpf!: string;
  qtd!: any;
  promocaoId!: string;

  constructor(
    private reg: RegisterService,
    private log: LoginService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.promocaoId = window.localStorage.getItem('activeCampaign')!
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
  
  stampCard(form: NgForm):void{
    console.log(this.qtd, this.cpf)
    if(!form.value.cpf){
      this.showModal('Insira o CPF do cliente para carimbar o cartão')
    } else if(form.value.cpf.length !== 11 || !this.reg.isCpfValid(form.value.cpf)){
      this.showModal('CPF inválido. Tente novamente')
    } else if(!form.value.qtd){
      this.showModal('Informe a quantidade de carimbos que o cartão receberá')
    } else if (!this.promocaoId){
      this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
      setTimeout(() => {
        this.log.isntAuth()
        window.localStorage.removeItem('userId')
        this.router.navigate(['/'])
        console.log(this.promocaoId)
      }, 3000)
    } else {
    let body = {
      idPromocao: this.promocaoId,
      cpf: this.cpf,
      qtdCarimbos: +this.qtd
    }
    this.reg.stampCard(body).subscribe({
      next: response => {
        console.log(response)
        this.showModal('Carimbado com Sucesso')
        form.reset()
        // this.cpf = ''
        // this.qtd = ''
        // this.router.navigate(['/stamp'])
        // setTimeout(() => this.router.navigate(['/login']),3000)
      },
      error: err => {
        console.log(body)
        this.showModal(`Erro ao carimbar ${err.status}`, 'Verificar dados', 'Cartão não carimbado')
      }
    })
  }
}
}
