import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [AuthenticationService],
      imports: [HttpClientModule, RouterModule.forRoot([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have AuthenticationService injected', () => {
    expect(component._authService).toBeTruthy();
    expect(component._authService instanceof AuthenticationService).toBeTruthy();
  });
});
