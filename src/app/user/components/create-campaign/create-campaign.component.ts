import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  dataValidade!: string;
  qtdCarimbo!: string;
  descricao!: string;
  data_validade!: string;
  userId!: string;
  havePromo!: boolean;
  lastPromo = {
    dataValidade: '',
    espacoTotal: '',
    descricao: ''
  }

  constructor(
    private log: LoginService,
    private user: UserService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit(): void {
    
    if(this.user.getInfo().username?.length != 14) this.router.navigate(['/'])
      this.userId = window.localStorage.getItem('id')!
    
    this.havePromo = this.user.havePromo()
    this.lastPromo = {
      dataValidade: window.localStorage.getItem('dataValidade')!,
      espacoTotal: window.localStorage.getItem('carimbos')!,
      descricao: window.localStorage.getItem('descricao')!
    }

    if(this.havePromo && this.user.getInfo().username?.length == 14){
      this.showModal('Você já possui uma promoção ativa', 'Ver detalhes')
    }
  }

  futureDate(input: string){

    let date = input.split('/')
    let currentDate = new Date(Date.now())
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth() +1 
    let currentDay = currentDate.getDate()
       
    if (+date[2] > currentYear){
      return true
    } if (+date[2] == currentYear && +date[1] > currentMonth + 1){ 
      return true
    } if (+date[1] == currentMonth +1 && +date[0] >= currentDay){
      return true
    }
    return false

  }

  treatingData(){
    this.dataValidade = this.data_validade.split('/').reverse().join('-')
  }

  createPromo():void{
    if (!this.data_validade && !this.qtdCarimbo && !this.descricao)
      this.showModal('Informe os dados da nova promoção')   
    else if (!this.data_validade.length)
      this.showModal('Informe a data de vigência da nova promoção') 
    else if (!this.futureDate(this.data_validade) && this.data_validade.length > 0)
      this.showModal('A duração mínima é de 30 dias','OK', 'Informe uma data futura')
    else if (!this.qtdCarimbo)
      this.showModal('Informe a quantidade de carimbos necessários para a contemplação')
    else if (isNaN(+this.qtdCarimbo))
      this.showModal('Quantidade inválida')
    else if (!(+this.qtdCarimbo > 0 && +this.qtdCarimbo < 21))
      this.showModal('Quantidade máxima de carimbos permitida é 20')
    else if (!this.descricao)
      this.showModal('Descreva a promoção para seu cliente')
    else if (!this.userId){
      this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
      this.log.logout()
      setTimeout(() => {
        this.log.logout()
        window.localStorage.removeItem('userId')
        this.router.navigate(['/'])
      }, 3000)
    }
    else{
      this.treatingData()
      let body = {
        idEmpresa: this.userId,
        dataValidade: this.dataValidade,
        quantidadeCarimbo: +this.qtdCarimbo,
        descricao: this.descricao
      }
      this.user.createPromo(body).subscribe({
        next: () => {
          this.showModal('Promoção Criada com Sucesso')
          setTimeout(() => this.router.navigate(['/dashboard']),3000)
        },
        error: err => {
          if (err.status == 403){
            this.showModal('Faça o login novamente', 'OK', 'Sessão expirada!')
            this.log.logout()
            setTimeout(() => {
              this.router.navigate(['/'])
            }, 3000)
          } else {
          this.showModal(`Erro de comunicação com o servidor!`, 'Tentar novamente', 'Erro ao criar nova promoção')
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
