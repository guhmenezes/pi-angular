import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { BackComponent } from './components/back/back.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    AccessibilityComponent,
    AlertModalComponent,
    BackComponent,
  ],
  imports: [
    CommonModule,
    // FormsModule,
    RouterModule,
  ],
  exports: [
    AccessibilityComponent,
    // AlertModalComponent,
    BackComponent,
    FormsModule,    
    NgbModule,
    NgxMaskModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
