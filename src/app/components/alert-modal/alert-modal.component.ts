// import { Component, Input } from '@angular/core';
// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'app-alert-modal',
//   templateUrl: './alert-modal.component.html',
//   // add NgbModalConfig and NgbModal to the component providers
//   providers: [NgbModalConfig, NgbModal]
// })
// export class AlertModalComponent {
    
//   cont = {
//     title: 'skjk',
//     msg: 'sdj'
//   }

//   constructor(config: NgbModalConfig, private modalService: NgbModal) {
//     // customize default values of modals used by this component tree
//     config.backdrop = 'static';
//     config.keyboard = true;
//   }

//   open(content:any) {
//     this.modalService.open(content);
  
//   }
// }

import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="submit" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p class="h4">{{msg}}</p>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">{{txtBtn}}</button>
    </div>
  `
})
export class ModalContent {
  @Input() msg:any;
  @Input() title:any;
  @Input() txtBtn:any;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({selector: 'app-alert-modal', templateUrl: './alert-modal.component.html'})
export class AlertModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.msg = '';
    modalRef.componentInstance.title = '';
    modalRef.componentInstance.txtBtn = 'OK';
  }
}