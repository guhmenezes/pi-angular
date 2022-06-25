import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
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
  // dataLoad: boolean = false;
  lastPromo: string[] = [];

  constructor(private login: LoginService, private user: UserService) { }

  ngOnInit(): void {
    // this.info.emituserLogged.subscribe(
    //   data => this.username = data
    // )
    // this.info.getUsername().subscribe(
    //   data => this.username = data
    //   )
    //   console.log(this.username)
    // LoginService.emituserLogged.subscribe(data => { 
    //   if(data){
    //     this.username = data.username;
    //     console.log(this.username)
    //   }
    // });
    // let fullName = this.info.getInfo().nome!.split(" ");
    // this.firstName = fullName[0];
    // this.lastName = fullName[fullName.length-1]
    // // this.userLogged()
    // this.havePromo = this.user.havePromo()
    this.userId = window.localStorage.getItem('id')!
    this.username = window.localStorage.getItem('username')!
    if(this.username.length == 11) this.cpf = this.username
    else if (this.username.length == 14) this.cnpj = this.username
    this.getUser()
    // if(!this.user.havePromo()){
    //   this.getUser()
    // if(!this.havePromo)
    // }
    //   console.log('vazio')
    //   this.getActivePromo(this.userId)
    // }
    // console.log(this.userId)
    // if(this.cnpj)
    // this.activeCampaign()
    // this.userLogged() //getinfo
    // this.username = window.localStorage.getItem('username')!
    // if(this.user.getInfo().nome) //localstorage
    // console.log(this.user.getInfo())
    // else //request
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
        // let fullName = data.nome.split(" ");
        // this.firstName = fullName[0];
        // this.lastName = fullName[fullName.length-1]
        console.log(data)
        // this.dataLoad = true
      },
      error: err => {
        if (err.status == 403){
          console.log('token invalido')
          console.log('sessoa expierada')
        } else if (err.status > 400 ){
          console.log('erro 400')
        }
      }
  })
  }

  getActivePromo(responseId:string){
    this.user.getPromo(responseId).subscribe({
      next: response => {
        console.log(response)
        this.lastPromo = response[0]
        console.log(this.lastPromo)
        if (response.length > 0)
        this.user.setPromo(response[0].idPromocao, response[0].dataValidade, response[0].descricao, response[0].quantidadeCarimbo)
        else this.user.setPromo('false')
      },
      error: err => {
        console.log('erro ao carregar info das promoções', err.status)
      }
    })
  }

  getCards(responseId:string){
    this.user.getCards(responseId).subscribe({
      next: response => {
        console.log(response)
        this.lastPromo = response[0]
        console.log(this.lastPromo)
        if (response.length > 0)
        this.user.setPromo(response[0].idPromocao)
        else this.user.setPromo('false')
      },
      error: err => {
        console.log('erro ao carregar info das promoções', err.status)
      }
    })
  }
  // userLogged(){
  //   this.info.getUser(this.username).subscribe(
  //     data => {
  //       let fullName = data.nome.split(" ");
  //       this.firstName = fullName[0];
  //       this.lastName = fullName[fullName.length-1]
  //       console.log(data)
  //       // if (data.empresaId)
  //       // this.userId = data.empresaId;
  //       // else 
  //       // this.userId = data.usuarioId
  //       // window.localStorage.setItem('userId',this.userId) //ALTERAR ESTE COMANDO DEPOIS  
  //     }
  //   )
  // }
  userLogged(){
    let id = '4545454545-45-4-5-4'
    let nome = 'AMOR & CACAU'
    let username = 'cpfcnpj'
    let email = 'email'
    let telefone = '1841511'
    let token = 'Bearer token'
    let havePromo = ''
    let userCards = ''
    let cartoes = [{id: '2351-21'},{id: '2462-32'}, {id: '2573-43'}]
    if (username.length == 8)
    //request promocoes
    havePromo = 'promo[0].id'
    if (username.length == 7){
    //request cartoes
    // for cartoes card.id
    for(let i = 0; i< cartoes.length; i++){
    console.log(cartoes.length)
    userCards += `${cartoes[i].id}, `
    console.log(userCards)
    havePromo = userCards
    }
  }
    // this.user.setInfo(id, nome, username, email, telefone) //login

    let fullName = nome.split(" ");
    if (fullName.length >= 3 && fullName[fullName.length-2].length < 4)
    this.part = fullName[fullName.length-2]
    this.firstName = fullName[0];
    this.lastName = fullName[fullName.length-1]
    
    // this.lastName = {fullName[fullName.length-1]}`

  //   this.user.getUser('42202775870').subscribe({
  //     next: data => {
  //       let fullName = data.nome.split(" ");
  //       this.firstName = fullName[0];
  //       this.lastName = fullName[fullName.length-1]
  //       console.log(data)
  //     },
  //     error: err => {
  //       if (err.status == 403){
  //         console.log('token invalido')
  //       } else if (err.status > 400 ){
  //         console.log('erro 400')
  //       }
  //     }
  // })
  }

  // activeCampaign(){
  //   this.info.getPromo(window.localStorage.getItem('userId')!).subscribe({
  //     next: data => {
  //       console.log(data)
  //       window.localStorage.setItem('activeCampaign', data[0].idPromocao!)
  //       window.localStorage.setItem('valid', data[0].dataValidade!)
  //       window.localStorage.setItem('qtyStamp', data[0].quantidadeCarimbo.toString()!)
  //       window.localStorage.setItem('description', data[0].descricao!)
  //     }
  //   })
  // }

  logout() { 
    // this.login.isntAuth()
    this.login.logout()
    // window.localStorage.removeItem('activeCampaign')
    // window.localStorage.removeItem('userLogged')
    // window.localStorage.removeItem('userId')
  }

}
