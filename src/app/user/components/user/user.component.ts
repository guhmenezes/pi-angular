import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

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
  lastName: string = '';
  userId!:string;

  constructor(private info: LoginService) { }

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
    // this.username = window.localStorage.getItem('login')!
    // let fullName = this.info.getInfo().nome!.split(" ");
    // this.firstName = fullName[0];
    // this.lastName = fullName[fullName.length-1]
    // // this.userLogged()
    // if(this.username.length == 11) this.cpf = this.username
    // else if (this.username.length == 14) this.cnpj = this.username
    // console.log(this.userId)
    // if(this.cnpj)
    // this.activeCampaign()
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

  activeCampaign(){
    this.info.getPromo(window.localStorage.getItem('userId')!).subscribe({
      next: data => {
        console.log(data)
        window.localStorage.setItem('activeCampaign', data[0].idPromocao!)
        window.localStorage.setItem('valid', data[0].dataValidade!)
        window.localStorage.setItem('qtyStamp', data[0].quantidadeCarimbo.toString()!)
        window.localStorage.setItem('description', data[0].descricao!)
      }
    })
  }

  logout() { 
    this.info.isntAuth()
    // window.localStorage.removeItem('activeCampaign')
    // window.localStorage.removeItem('userLogged')
    // window.localStorage.removeItem('userId')
  }

}
