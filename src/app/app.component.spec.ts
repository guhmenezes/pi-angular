import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { FormsModule } from '@angular/forms';
import { BackComponent } from './shared/components/back/back.component';
import { AccessibilityComponent } from './shared/components/accessibility/accessibility.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        NgxMaskModule.forRoot(),
        NgxQRCodeModule,
        SharedModule,
        UserModule,
        FormsModule,
        BrowserModule
      ],
      declarations: [
        AppComponent,
        BackComponent,
        AccessibilityComponent,
        HeaderComponent,
        FooterComponent,
      ],

    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'clube-de-vantagens'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('clube-de-vantagens');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('.content span')?.textContent).toContain('clube-de-vantagens app is running!');
  });
});
