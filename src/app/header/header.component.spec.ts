import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [AuthenticationService],
      imports: [HttpClientModule]
    }).compileComponents();

    const authService = TestBed.inject(AuthenticationService);
    component = new HeaderComponent(authService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
