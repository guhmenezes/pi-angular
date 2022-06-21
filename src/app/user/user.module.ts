import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './components/campaign/campaign.component';
import { CardsComponent } from './components/cards/cards.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { InfoComponent } from './components/info/info.component';
import { StampComponent } from './components/stamp/stamp.component';
import { UserComponent } from './components/user/user.component';
import { NgbdCarouselNavigation } from './components/cards/carousel-navigation.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CampaignComponent,
    CardsComponent,
    CreateCampaignComponent,
    CreateCardComponent,
    InfoComponent,
    NgbdCarouselNavigation,
    StampComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
