// import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from 'src/app/core/models/login';
import { UserPF } from 'src/app/core/models/userPF';
import { LoginService } from 'src/app/core/services/login.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
// import { ModalContent } from '../../alert-modal/alert-modal.component';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = new Login();
  userRegistered: Login = new Login();
  remember = false;
  username = new EventEmitter();
  tryRegister: UserPF = new UserPF();
  serverOn = true;

  constructor(
    private loginService: LoginService, 
    private registerWorks: RegisterService,
    private router: Router,
    private modalService: NgbModal
    ) {
   }

  ngOnInit(): void {
    // if (this.remember) {
      // this.statusServer()
      window.localStorage.removeItem('activeCampaign')
      window.localStorage.removeItem('userLogged')
      window.localStorage.removeItem('userId')
      window.localStorage.removeItem('valid')
      window.localStorage.removeItem('qtyStamp')
      window.localStorage.removeItem('description')
      if (window.localStorage.getItem('uar')){
        this.user.usuario = window.localStorage.getItem('uar')!
        window.localStorage.removeItem('uar')
      }
      else if (window.localStorage.getItem('login') && window.localStorage.getItem('pass')){
      this.user.usuario = window.localStorage.getItem('login')!
      this.user.senha = window.localStorage.getItem('pass')!
      this.user.remember = true
    }
      // this.loginService.emitUserLogged.subscribe(
        // data => { 
          // this.usuario = data
          // console.log(this.usuario)
        // }
      // )
    // } 
  }
  // console.log(this.rememberMe?.ariaChecked)
  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
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
    // this.tryRegister = {  
    //   nome: '',
    //   cpf: '',
    //   email: '',
    //   telefone: '',
    //   senha: '',
    //   data_nascimento: ''
    // }
    console.log(this.tryRegister)
    // this.registerWorks.createConsumer(this.tryRegister).subscribe({
    //   next: () => console.log('work'),
    //   error: err => {
    //     if(err.status !== 0) {
    //       console.log('work')
    //       this.serverOn = true
    //   }
    //     else {
    //       console.log('fora do ar')
    //       this.serverOn = false
    //   }
    //   }
      
    // })
  }

  cadastro(){
    if(this.serverOn) this.router.navigate(['/cadastro'])
    else {
      // this.statusServer();
    }
  }

  // loginAPI(){
  //   this.loginService.loginAPI(this.user).subscribe({
  //     next: resp => {
        
  //           // const token = resp.headers.get('X-Access-Token');
  //           console.log(resp)
  //           // localStorage.setItem('token', token);
  //           // this.user = user;
  //     },
  //     error: err => console.log(err)
  //   })
  // }


  loginToken(){
    if(this.user.usuario == undefined  && this.user.senha == undefined) 
    this.showModal('Informe seu CPF/CNPJ e senha para acessar')
    else if(this.user.usuario.length != 11 && this.user.usuario.length != 14)
    this.showModal('Usuário inválido')
    // else if(this.user.usuario == undefined && this.user.senha != undefined)
    // this.showModal('Informe seu CPF/CNPJ')
    else if(this.user.senha == undefined)
    this.showModal('Informe sua senha')
    else if(this.user.senha.length < 4 || this.user.senha.length > 12)
    this.showModal('Usuário e/ou senha inválidos')
    else{
    this.loginService.loginToken(this.user).subscribe({
      next: response => {
        console.log(response)
        // window.localStorage.setItem('userId', response.id)
        // window.localStorage.setItem('userLogged', response.usuario)
        // window.localStorage.setItem('nome', response.nome)
        // window.localStorage.setItem('email', response.email)
        // window.localStorage.setItem('telefone', response.telefone)
        // window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('token',
 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMTExMTExMTExMTExMSIsImV4cCI6MTY1NTg2MzQ1OH0.klAwp41yLkA6QWzkAuod46Z-i-pAzX0PHxfX2m6pSepXPAtl4S7JuZW-syyOhDUAtbVR_5EhEAEYS41YAauA2A')
        this.loginService.userAuthenticated(true)
        if (this.user.remember)
        this.remember = true;
        this.rememberMe(this.user.usuario,this.user.senha);
      }
      ,error: err => this.showModal('Usuário não encontrado','Realizar Cadastro')
    })
  }
  }
  // loginCerto(){
  //   let usuario = this.user.usuario
  //   if(usuario.length === 11){
  //     this.loginService.getConsumer(usuario).subscribe({
  //       next: dados => {
  //         console.log(dados)
  //         window.localStorage.setItem('userId', dados.usuarioId)
  //         window.localStorage.setItem('userLogged', dados.cpf)
  //         window.localStorage.setItem('nome', dados.nome)
  //         window.localStorage.setItem('email', dados.email)
  //         // window.localStorage.setItem('telefone', dados.telefone)
  //         window.localStorage.setItem('aniversario', dados.dataNascimento)
  //         //funcao token
  //       }
  //       ,
  //       error: err => this.showModal(`Erro ${err.status}`)
  //     })
  //   } else if(usuario.length === 14){
  //     this.loginService.getCorporate(usuario).subscribe({
  //       next: dados => {
  //         window.localStorage.setItem('userId', dados.id)
  //         window.localStorage.setItem('userLogged', dados.cnpj)
  //         window.localStorage.setItem('nome', dados.contatoNome)
  //         window.localStorage.setItem('email', dados.email)
  //         window.localStorage.setItem('telefone', dados.telefone)
  //         //funcao token
  //       }
  //       ,
  //       error: err => this.showModal(`Erro ${err.status}`)
  //     })
  //   } else {
  //     this.showModal('Usuário não encontrado')
  //   }
  // }

  // login(){
  //   console.log(this.user)
  //   if (this.user.remember)
  //   this.remember = true;
  //   this.rememberMe(this.user.usuario,this.user.senha);
    // this.loginService.getUser(this.user).subscribe(
    //   response => {
    //     console.log(response)
    //     // console.log(response.headers)
    //     // console.log(response.headers.get('authorization'))
    //     // let header:string = response.headers.get('Authorization')!
    //     // console.log(header)
    //   }
    // )
  //   try{
  //     this.loginService.getUser(this.user.usuario).subscribe({
  //       next: response => {
  //         if(this.user.usuario.length == 14)
  //         this.userRegistered.usuario = response.cnpj!
  //         else this.userRegistered.usuario = response.cpf!
  //         this.userRegistered.senha = response.senha
  //         this.loginService.login(this.user, this.userRegistered)
  //         window.localStorage.setItem('userLogged',this.userRegistered.usuario)
  //         // this.setusuario(this.user.usuario)
  //     },
  //     error: err => this.showModal(`Erro ${err.status}`)

  //   }
  //   )
  //   console.log(this.user)
  // } catch (e) {
  //   alert('Not Found')
  // }
  // }

  // setusuario(usuario: string): void{ //aqui eu envio o valor para uma função do serviço.
  //   this.loginService.setusuario(usuario);
  //   LoginService.emitUserLogged.emit({ usuario: usuario });
  // }
}


