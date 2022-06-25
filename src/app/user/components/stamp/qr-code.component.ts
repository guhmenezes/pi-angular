import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ModalContent } from 'src/app/shared/components/alert-modal/alert-modal.component';
import { UserService } from '../../services/user.service';

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

  constructor(
    private user: UserService, 
    private modalService: NgbModal,
    private router: Router) { }
  
  ngOnInit(): void {
      this.elementType = NgxQrcodeElementTypes.URL;
      this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
      this.value = `http://192.168.0.15:4200/carimbar/${this.stampCode}`;
    }

    stamp(){
      this.router.navigate(['/carimbar/',this.stampCode])
        // this.user.stamp(this.stampCode).subscribe({
        //     next: () => this.showModal('Carimbado com sucesso'),
        //     error: err => {
        //         if(err.status == 200){
        //           this.showModal('Carimbado com sucesso')
        //         } else if (err.status == 422){
        //             this.showModal('Carimbo já efetuado')
        //         } else if (err.status == 403){
        //             this.showModal('Faça seu login para efetuar o carimbo', 'OK')
        //             setTimeout(() => {
        //               this.router.navigate(['/'])
        //             //   console.log(this.userId)
        //             }, 3000)
        //         } else 
        //         this.showModal(`Erro ao carimbar ${err.status}`, 'Verificar dados', 'Cartão não carimbado')
        //         // this.stampCode = ''
        //         setTimeout(() => {
        //             window.location.reload()
        //         },3000)
        //     }
        // })
      }

    showModal(msg:string, txtBtn:string = 'OK', title?:string,){
        const modalRef = this.modalService.open(ModalContent);
        modalRef.componentInstance.msg = msg;
        modalRef.componentInstance.title = title
        modalRef.componentInstance.txtBtn = txtBtn
    }
}