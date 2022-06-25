import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/components/login/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    NgxMaskModule.forRoot(),
    NgxQRCodeModule,
    SharedModule,
    UserModule,
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
