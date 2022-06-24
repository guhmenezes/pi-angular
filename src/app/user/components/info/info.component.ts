import { Component, Input, OnInit } from '@angular/core';
import { UserPF } from 'src/app/core/models/userPF';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  // user!: UserPF;
  username: string = '';
  nome!: string;
  email!: string;
  telefone!: string;


  constructor(private user: UserService, private reg: RegisterService) { }

  ngOnInit(): void {
    // this.username = window.localStorage.getItem('login')!
    // this.getUser()
    let data = this.user.getInfo()
    if(data.id){
    this.nome = data.nome!.toUpperCase()
    this.email = data.email!
    this.telefone = data.telefone!
    } else {
      console.log('sessao expirada')
      console.log('erro ao carregar dados')
    }
    // this.nome = 'TESTE DA SILVA SAURO'
    // this.email = 'teste@teste.com.br'
    // this.telefone = '19987654321'
  }

  // getUser(): void {
  //   this.info.getUser(this.username)?.subscribe({
  //     next: (data:any) => {
  //       this.user = data;
  //       this.nome = data.nome.toUpperCase();
  //       this.email = data.email;
  //       this.telefone = data.telefone
  //       console.log(data);
  //       console.log(this.user)
  //     }
  //   })
  // }

  updateData():void{
    // this.user.email = this.email;
    // this.user.telefone = this.telefone;
    // this.reg.editConsumer(this.user.cpf, this.user)
    // console.log(this.user)
  }
}
