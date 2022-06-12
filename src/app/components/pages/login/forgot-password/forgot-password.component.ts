import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  title = 'Esqueceu a Senha ?'
  
  constructor(public bsModalRef: NgbModalRef) { }

  ngOnInit(): void {
  }

  onConfirm() {

   }

  onClose() { 
    this.bsModalRef.hidden
  }

}
