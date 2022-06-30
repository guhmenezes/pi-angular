import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from '../../services/user.service';

import { CreateCampaignComponent } from './create-campaign.component';

describe('CreateCampaignComponent', () => {
  let component: CreateCampaignComponent;
  let fixture: ComponentFixture<CreateCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCampaignComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ UserService, LoginService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
