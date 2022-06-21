import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  title: string = 'Recuperar Senha';
  msg: string = 'Informe CPF ou CNPJ cadastrado';
  cancel: string = 'Cancelar';
  ok: string = 'Recuperar Acesso';
  username = '';
  submit = false;

  constructor(private modalRef: NgbModal) { }


  ngOnInit(): void {
    this.submit = false;
    // this.title = 'Recuperar Senha';
    // this.msg = 'Informe CPF ou CNPJ cadastrado';
    // this.ok = 'Recuperar Acesso';
    // this.username = '';
  }

  ngOnDestroy() {
    ForgotPasswordComponent
}

  onClose(){ 
    // this.modalRef.close();
    window.location.reload()
  }


  open(content:any) {
    this.modalRef.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
  }

  onConfirm(){ 
    console.log(this.username)
    if (this.username.length === 11 || this.username.length === 14){
      this.submit = true
      this.title = ''
      this.msg = 'Seus dados de acesso foram enviados em seu e-mail cadastrado.'
    }
  }


}
