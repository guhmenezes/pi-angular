import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterService } from 'src/app/core/services/register.service';
import { UserService } from '../../services/user.service';

import { CreateCardComponent } from './create-card.component';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCardComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ UserService, RegisterService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
