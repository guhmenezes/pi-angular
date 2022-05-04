import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { InfoComponent } from './components/pages/user/info/info.component';
import { UserComponent } from './components/pages/user/user.component';
import { CardsComponent } from './components/pages/user/cards/cards.component';
import { CampaignComponent } from './components/pages/user/campaign/campaign.component';
import { IndexComponent } from './components/pages/index/index.component';
import { ForgotPasswordComponent } from './components/pages/login/forgot-password/forgot-password.component';
import { CreateCampaignComponent } from './components/pages/user/create-campaign/create-campaign.component';
import { CreateCardComponent } from './components/pages/user/create-card/create-card.component';
import { StampComponent } from './components/pages/user/stamp/stamp.component';
import { FooterComponent } from './components/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    UserComponent,
    CardsComponent,
    CampaignComponent,
    IndexComponent,
    ForgotPasswordComponent,
    CreateCampaignComponent,
    CreateCardComponent,
    StampComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
