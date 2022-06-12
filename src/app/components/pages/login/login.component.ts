import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { UserPF } from 'src/app/models/userPF';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = new Login();
  userRegistered: Login = new Login();
  remember = false;
  username = new EventEmitter();

  constructor(private loginService: LoginService) {
   }

  ngOnInit(): void {
    // if (this.remember) {
      if (window.localStorage.getItem('login') && window.localStorage.getItem('pass')){
      this.user.username = window.localStorage.getItem('login')!
      this.user.password = window.localStorage.getItem('pass')!
      this.user.remember = true
    }
      // this.loginService.emitUserLogged.subscribe(
        // data => { 
          // this.username = data
          // console.log(this.username)
        // }
      // )
    // } 
  }
  // console.log(this.rememberMe?.ariaChecked)

  rememberMe(login: string, password: string){
    window.localStorage.setItem('login', login)
    if (this.remember) {
      window.localStorage.setItem('pass', password)
    } else {
      window.localStorage.setItem('pass', '')
    } 
  }

  login(){
    console.log(this.user)
    if (this.user.remember)
    this.remember = true;
    this.rememberMe(this.user.username,this.user.password);
    // this.loginService.getUser(this.user).subscribe(
    //   response => {
    //     console.log(response)
    //     // console.log(response.headers)
    //     // console.log(response.headers.get('authorization'))
    //     // let header:string = response.headers.get('Authorization')!
    //     // console.log(header)
    //   }
    // )
    try{
      this.loginService.getUser(this.user.username).subscribe({
        next: response => {
          if(this.user.username.length == 14)
          this.userRegistered.username = response.cnpj!
          else this.userRegistered.username = response.cpf!
          this.userRegistered.password = response.senha
          this.loginService.login(this.user, this.userRegistered)
          // this.setUsername(this.user.username)
      },
      error: err => console.log('Error', err)

    }
    )
    console.log(this.user)
  } catch (e) {
    alert('Not Found')
  }
  }

  setUsername(username: string): void{ //aqui eu envio o valor para uma função do serviço.
    this.loginService.setUsername(username);
    LoginService.emitUserLogged.emit({ username: username });
  }
}
