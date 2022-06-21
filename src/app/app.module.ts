import { AppComponent } from './app.component';
// import { HeaderComponent } from './core/components/header/header.component';
// import { LoginComponent } from './core/components/login/login.component';
// import { RegisterComponent } from './core/components/register/register.component';
// import { InfoComponent } from './user/components/info/info.component';
// import { UserComponent } from './user/components/user/user.component';
// import { CardsComponent } from './user/components/cards/cards.component';
// import { CampaignComponent } from './user/components/campaign/campaign.component';
// import { ForgotPasswordComponent } from './core/components/login/forgot-password/forgot-password.component';
// import { CreateCampaignComponent } from './user/components/create-campaign/create-campaign.component';
// import { CreateCardComponent } from './user/components/create-card/create-card.component';
// import { StampComponent } from './user/components/stamp/stamp.component';
// import { FooterComponent } from './core/components/footer/footer.component';


import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { NgbdCarouselNavigation } from './user/components/cards/carousel-navigation.component';
// import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';
import { AuthInterceptor } from './core/components/login/auth.interceptor';
// import { Error404Component } from './core/components/error404/error404.component';
// import { BackComponent } from './shared/components/back/back.component';
// import { AccessibilityComponent } from './shared/components/accessibility/accessibility.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // AccessibilityComponent,
    // LoginComponent,
    // RegisterComponent,
    // BackComponent,
    // InfoComponent,
    // UserComponent,
    // CardsComponent,
    // CampaignComponent,
    // ForgotPasswordComponent,
    // CreateCampaignComponent,
    // CreateCardComponent,
    // StampComponent,
    // FooterComponent,
    // NgbdCarouselNavigation,
    // AlertModalComponent,
    // Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ReactiveFormsModule,
    // NgbPaginationModule, DE ONDE É ?
    HttpClientModule,
    CoreModule,
    SharedModule,
    UserModule,
    NgbModule,
    NgxMaskModule.forRoot({
      // dropSpecialCharacters: false,
    }),
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
