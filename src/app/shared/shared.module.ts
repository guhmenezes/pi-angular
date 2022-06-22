import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { BackComponent } from './components/back/back.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AccessibilityComponent,
    AlertModalComponent,
    BackComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AccessibilityComponent,
    BackComponent,
    FormsModule,    
    NgbModule,
    NgxMaskModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
