import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  title: string = 'Recuperar Senha - Versão Beta';
  msg: string = 'Informe CPF ou CNPJ cadastrado';
  cancel: string = 'Cancelar';
  ok: string = 'Recuperar Acesso';
  username = '';
  submit = false;

  constructor(private modalRef: NgbModal, private user: UserService) { }


  ngOnInit(): void {
    this.submit = false;
  }

  onClose(){ 
    window.location.reload()
  }


  open(content:any) {
    this.modalRef.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
  }

  onConfirm(){ 
    if (this.username.length === 11 || this.username.length === 14){
      this.user.getUser(this.username).subscribe({
        next: () => {
          this.submit = true
          this.title = ''
          this.msg = 'Seus dados de acesso foram enviados em seu e-mail cadastrado.'
        },
        error: err => {
          this.submit = true
          this.title = ''
          this.msg = 'Não foi possível encontrar seus dados de acesso.'
        }
      })
    }
  }
  
}
