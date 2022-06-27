import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./stamp.component.css']
})
export class QrCodeComponent implements OnInit {

  @Input()
  stampCode!: string;

  elementType!: NgxQrcodeElementTypes;
  correctionLevel!: NgxQrcodeErrorCorrectionLevels;
  value!: string;

  constructor(private modalService: NgbModal, private router: Router) { }
  
  ngOnInit(): void {

    this.elementType = NgxQrcodeElementTypes.URL;
    this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    this.value = `${location.href}/${this.stampCode}`;
    
  }

  toStamp(){
    this.router.navigate(['/carimbar/',this.stampCode])
  }

  showModal(msg:string, txtBtn:string = 'OK', title?:string,){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.title = title
    modalRef.componentInstance.txtBtn = txtBtn
  }

}