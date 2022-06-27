import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = new Login();
  remember = false;
  serverOn = false;

  constructor(
    private loginService: LoginService, 
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal
    ) {
   }

  ngOnInit(): void {

    if(this.userService.getInfo().username){
      this.router.navigate(['/dashboard'])
    }
    else if (window.localStorage.getItem('uar')){
      this.user.usuario = window.localStorage.getItem('uar')!
      window.localStorage.removeItem('uar')
    }
    else if (window.localStorage.getItem('login') && window.localStorage.getItem('pass')){
      this.user.usuario = window.localStorage.getItem('login')!
      this.user.senha = window.localStorage.getItem('pass')!
      this.remember = true
    }

  }

  login(){
    if(this.user.usuario == undefined  && this.user.senha == undefined) 
      this.showModal('Informe seu CPF/CNPJ e senha para acessar')
    else if(this.user.usuario.length != 11 && this.user.usuario.length != 14)
      this.showModal('Usuário inválido')
    else if(this.user.senha == undefined)
      this.showModal('Informe sua senha')
    else if(this.user.senha.length < 4 || this.user.senha.length > 14)
      this.showModal('Usuário e/ou senha inválidos')
    else{
      this.loginService.login(this.user).subscribe({
        next: response => {
          window.localStorage.setItem('username', this.user.usuario)
          this.loginService.setToken(response.token)
          this.loginService.userAuthenticated(true,true)
          if (this.remember)
          this.remember = true;
          this.rememberMe(this.user.usuario,this.user.senha);
        }
        ,error: err => {
          if(err.status == 403)
          this.showModal('Usuário e/ou senha inválidos')
          else this.showModal(`Erro de comunicação com o servidor! ${err.message}`)
        }
      })
    }
  }

  rememberMe(login: string, senha: string){
    if (this.remember) {
      window.localStorage.setItem('login', login)
      window.localStorage.setItem('pass', senha)
    } else {
      window.localStorage.removeItem('login')
      window.localStorage.removeItem('pass')
    } 
  }

  statusServer(){
    let tryCommunication = new Login()
    this.loginService.login(tryCommunication).subscribe({
      next: () => this.showModal('Erro desconhecido'),
      error: err => {
        if (err.status == 0){
          this.showModal(`Erro de comunicação com o servidor! ${err.message}`, 'Tente novamente')
          this.serverOn = false
        } else {
          this.serverOn = true
        }
      }
    })
  }

  cadastro(){
    this.statusServer()
    setTimeout(()=> {
    if(this.serverOn) this.router.navigate(['/cadastro'])
    }, 100)
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }
  
}


