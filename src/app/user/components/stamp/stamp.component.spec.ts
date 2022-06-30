import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';

import { StampComponent } from './stamp.component';

describe('StampComponent', () => {
  let component: StampComponent;
  let fixture: ComponentFixture<StampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
