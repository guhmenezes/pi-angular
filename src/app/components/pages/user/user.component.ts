import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private info: LoginService) { }

  ngOnInit(): void {
    // this.info.emitUserLogged.subscribe(
    //   data => this.username = data
    // )
    // this.info.getUsername().subscribe(
    //   data => this.username = data
    //   )
    //   console.log(this.username)
    // LoginService.emitUserLogged.subscribe(data => { 
    //   if(data){
    //     this.username = data.username;
    //     console.log(this.username)
    //   }
    // });
    this.username = window.localStorage.getItem('login')!
    this.UserLogged()
    if(this.username.length == 11) this.cpf = this.username
    else if (this.username.length == 14) this.cnpj = this.username
  }

  UserLogged(){
    this.info.getUser(this.username).subscribe(
      data => {
        let fullName = data.nome.split(" ");
        this.firstName = fullName[0];
        this.lastName = fullName[fullName.length-1]
      }
    )
  }

}
