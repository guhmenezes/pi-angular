import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignComponent } from './components/campaign/campaign.component';
import { CardsComponent } from './components/cards/cards.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { InfoComponent } from './components/info/info.component';
import { NgbdCarouselNavigation } from './components/cards/carousel-navigation.component';
import { QrCodeComponent } from './components/stamp/qr-code.component';
import { StampComponent } from './components/stamp/stamp.component';
import { UserComponent } from './components/user/user.component';
// import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from '../core/components/login/login.component';
import { ConfirmStampComponent } from './components/stamp/confirm-stamp.component';



@NgModule({
  declarations: [
    CampaignComponent,
    CardsComponent,
    ConfirmStampComponent,
    CreateCampaignComponent,
    CreateCardComponent,
    InfoComponent,
    NgbdCarouselNavigation,
    QrCodeComponent,
    StampComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    NgxQRCodeModule,
  ],
  exports: [
    QrCodeComponent,
    LoginComponent
  ]
})
export class UserModule { }
