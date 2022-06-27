import { CampaignComponent } from './components/campaign/campaign.component';
import { CardsComponent } from './components/cards/cards.component';
import { ConfirmStampComponent } from './components/stamp/confirm-stamp.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from '../core/components/login/login.component';
import { NgbdCarouselNavigation } from './components/cards/carousel-navigation.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrCodeComponent } from './components/stamp/qr-code.component';
import { SharedModule } from '../shared/shared.module';
import { StampComponent } from './components/stamp/stamp.component';
import { UserComponent } from './components/user/user.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

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
