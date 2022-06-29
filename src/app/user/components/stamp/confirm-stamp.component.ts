import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Login } from "src/app/core/models/login";
import { LoginService } from "src/app/core/services/login.service";
import { ModalContent } from "src/app/shared/components/alert-modal/alert-modal.component";
import { environment } from "src/environments/environment";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: './confirm-stamp.component.html',
    styleUrls: ['./stamp.component.css']
})
export class ConfirmStampComponent implements OnInit{

    userAuth = new Login();
    stampCode!: string;
    userLogged = true;
    stampUser!:string;
    status = 'Validando informações ...'
    
    constructor(
        private user: UserService, 
        private login: LoginService,
        private actRouter: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router
        ){}

    ngOnInit(): void {

        this.stampCode = this.actRouter.snapshot.paramMap.get('code')!
        if(this.stampCode.indexOf('-') == -1 || this.stampCode.length < 20)
        this.router.navigate(['/error404'])
        else{
        this.stampUser = window.localStorage.getItem('stampUser') || 'Cliente'
        this.stamp()
        }

    }

    stamp(){
        setTimeout(()=>{
        this.user.stamp(`${environment.API}v1/stampcard/${this.stampCode}`).subscribe({
            next: () => {
                this.status = 'Efetuando carimbo . . .'
                setTimeout(()=>{
                    this.showModal(`${this.stampUser} teve seu cartão carimbado com sucesso`)
                },1000)
                setTimeout(() => {
                    this.router.navigate(['/'])
                },3000)
            },
            error: err => {
                this.status = 'Validando carimbo . . .'
                if(err.status == 200){
                    this.status = 'Efetuando carimbo . . .'
                    setTimeout(()=>{
                      this.showModal(`${this.stampUser} teve seu cartão carimbado com sucesso`)
                },1000)
                  setTimeout(() => {
                    this.router.navigate(['/'])
                },3000)
                } else if (err.status == 422){
                    setTimeout(()=>{
                    
                        this.showModal('Carimbo já efetuado')
                    },1000)
                    setTimeout(() => {
                        this.router.navigate(['/'])
                    },3000)
                } else if (err.status == 404){
                    this.status = 'Ops! carimbo inválido.'
                    setTimeout(()=>{
                        this.showModal('Carimbo inválido')
                    },1000)
                    setTimeout(() => {
                        this.router.navigate(['/'])
                    },3000)
                } else if (err.status == 403){
                    if(window.localStorage.getItem('login') && window.localStorage.getItem('pass')){
                        this.userAuth.usuario = window.localStorage.getItem('login')!
                        this.userAuth.senha = window.localStorage.getItem('pass')!
                        this.status = 'Fazendo login . . .'
                        setTimeout(()=>{
                            this.auth()
                        }, 3000)
                    } else {
                    this.status = ''
                    this.showModal('Faça seu login para efetuar o carimbo', 'OK')
                    this.userLogged = false;
                    this.login.logout()
                    }
                } else {
                this.showModal(`Erro de comunicação com o servidor!`, 'Tentar novamente', 'Cartão NÃO Carimbado')
                    this.status = 'Erro ao efetuar carimbo !'
                }
            }
        })
        },1000)
    }
    
    auth(){

        if(this.userAuth.usuario == undefined  && this.userAuth.senha == undefined) 
            this.showModal('Informe seu CPF/CNPJ para efetuar o carimbo')
        else if(this.userAuth.usuario.length != 11 && this.userAuth.usuario.length != 14){
            this.showModal('Usuário inválido')
            this.userLogged = false
        } else if(this.userAuth.senha == undefined){
            this.showModal('Informe sua senha')
            this.userLogged = false
        } else if(this.userAuth.senha.length < 4 || this.userAuth.senha.length > 14){
            this.showModal('Usuário e/ou senha inválidos')
            this.userLogged = false
        } else {
            this.login.login(this.userAuth).subscribe({
            next: response => {
                window.localStorage.setItem('username', this.userAuth.usuario)
                this.login.setToken(response.token)
                this.login.userAuthenticated(true, false)
                this.userLogged = true
                this.status = 'Validando carimbo . . .'
                setTimeout(()=>{
                    this.stamp()
                },500)
            }
            ,error: err => {
                if(err.status == 403){
                    this.status = 'Falha ao realizar login.'
                    this.login.logout()
                    setTimeout(()=>{
                        this.showModal('Usuário e/ou senha inválidos')
                        this.userLogged = false
                    },1000)
                } else this.showModal(`Erro de comunicação com o servidor!`)
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