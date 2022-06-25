import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Login } from "src/app/core/models/login";
import { LoginService } from "src/app/core/services/login.service";
import { ModalContent } from "src/app/shared/components/alert-modal/alert-modal.component";
import { UserService } from "../../services/user.service";
@Component({
    templateUrl: './confirm-stamp.component.html',
    styleUrls: ['./stamp.component.css']
})
export class ConfirmStampComponent implements OnInit{

    userAuth = new Login()
    stampCode!: string;
    userLogged = true
    
    constructor(
        private user: UserService, 
        private login: LoginService,
        private actRouter: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router
        ){}

    ngOnInit(): void {
        this.stampCode = this.actRouter.snapshot.paramMap.get('code')!
        console.log(this.stampCode)
        // if(this.login.getToken())
        this.stamp()


    }

    stamp(){
        this.user.stamp(`http://localhost:8181/v1/stampcard/${this.stampCode}`).subscribe({
            next: () => {
                this.showModal('Carimbado com sucesso')
                setTimeout(() => {
                    this.router.navigate(['/'])
                },3000)
            },
            error: err => {
                if(err.status == 200){
                  this.showModal('Carimbado com sucesso')
                  setTimeout(() => {
                    this.router.navigate(['/'])
                },3000)
                } else if (err.status == 422){
                    this.showModal('Carimbo já efetuado')
                    setTimeout(() => {
                        this.router.navigate(['/'])
                    },3000)
                } else if (err.status == 403){
                    this.showModal('Faça seu login para efetuar o carimbo', 'OK')
                    setTimeout(() => {
                    //   this.router.navigate(['/'])
                    //   console.log(this.userId)
                    }, 3000)
                } else 
                this.showModal(`Erro ao carimbar ${err.status}`, 'Verificar dados', 'Cartão não carimbado')
                // this.stampCode = ''
                // setTimeout(() => {
                //     window.locati
                // },3000)
            }
        })
    }
    
    showModal(msg:string, txtBtn:string = 'OK', title?:string,){
        const modalRef = this.modalService.open(ModalContent);
        modalRef.componentInstance.msg = msg;
        modalRef.componentInstance.title = title
        modalRef.componentInstance.txtBtn = txtBtn
    }

    auth(){

    }
}