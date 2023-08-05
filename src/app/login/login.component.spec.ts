import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: 
      [
        AuthenticationService, 
        {
            provide: ActivatedRoute,
            useValue: {
                queryParams: of({ returnUrl: "/posts" }), //nustatom, koki parametra tures activated route
            },
        },
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();

    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set returnUrl based on the provided query parameter', () => {
    expect(component['returnUrl']).toBe('/posts');
  });

  it('should initialize the login form with default values', () => {
    expect(component.loginForm.get('email')!.value).toBe('');
    expect(component.loginForm.get('password')!.value).toBe('');
  });
  
  it('should set values to login form', () => {
    const form: FormGroup = component.loginForm;
    form.setValue({ email: 'asd@some.com', password: '123123' });

    expect(component.loginForm.get('email')!.value).toBe('asd@some.com');
    expect(component.loginForm.get('password')!.value).toBe('123123');
  });

  it('should require email field', () => {
    const emailControl = component.loginForm.get('email');
    expect(emailControl!.hasError('required')).toBeTruthy();
    emailControl!.setValue('test@example.com');
    expect(emailControl!.hasError('required')).toBeFalsy();
  });

  it('should require a valid email', () => {
    const emailControl = component.loginForm.get('email');
    emailControl!.setValue('invalid-email');
    expect(emailControl!.hasError('email')).toBeTruthy();
    emailControl!.setValue('valid@example.com');
    expect(emailControl!.hasError('email')).toBeFalsy();
  });

  it('should require password field', () => {
    const passwordControl = component.loginForm.get('password');
    expect(passwordControl!.hasError('required')).toBeTruthy();
    passwordControl!.setValue('123123');
    expect(passwordControl!.hasError('required')).toBeFalsy();
  });

  it('should require password to have at least 5 characters', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl!.setValue('1234');
    expect(passwordControl!.hasError('minlength')).toBeTruthy();
    passwordControl!.setValue('12345');
    expect(passwordControl!.hasError('minlength')).toBeFalsy();
  });

  it('should require password to have at least 1 letter and 1 number', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl!.setValue('onlyletters');
    expect(passwordControl!.hasError('pattern')).toBeTruthy();
    passwordControl!.setValue('123456');
    expect(passwordControl!.hasError('pattern')).toBeTruthy();
    passwordControl!.setValue('letters123');
    expect(passwordControl!.hasError('pattern')).toBeFalsy();
  });

  it('should set submitted to true when call onSubmitLogin()', () => {
    component.onSubmitLogin();
    expect(component.submitted).toBeTruthy();
  });

  it('should not have to call loginUser http if form is invalid', () => {
    component.loginForm.setValue({ email: 'invalid-email', password: 'qwe' });
    spyOn(authService, 'loginUser');

    component.onSubmitLogin();
    
    expect(authService.loginUser).not.toHaveBeenCalled(); 
  });

  it('should have to call loginUser http if form is valid', () => {
    component.loginForm.setValue({ email: 'valid@example.com', password: 'letters123' });
    spyOn(authService, 'loginUser').and.returnValue(of());

    component.onSubmitLogin();
    
    expect(authService.loginUser).toHaveBeenCalled();
  });

  it('should handle login error with error message', () => {
    spyOn(authService, 'loginUser').and.returnValue(throwError({ error: { errors: ['Vartotojas nerastas'] } }));
    component.loginForm.setValue({ email: 'valid@example.com', password: 'password123' });
    component.onSubmitLogin();
  
    expect(component.loginErrors[0]).toEqual('Vartotojas nerastas');
  });
  
  it('should handle unknown login error', () => {
    spyOn(authService, 'loginUser').and.returnValue(throwError({ error: {}}));
    component.loginForm.setValue({ email: 'valid@example.com', password: 'password123' });
    component.onSubmitLogin();
  
    expect(component.loginErrors[0]).toEqual('Unknown login error');
  });

  it('should login user and navigate to url on success', () => {
    component.loginForm.setValue({ email: 'valid@example.com', password: 'password123' });
    spyOn(authService, 'loginUser').and.returnValue(of({ token: 'some token' }));
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigateByUrl');

    component.onSubmitLogin();
    
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'some token');
    expect(router.navigateByUrl).toHaveBeenCalledWith("/posts");
  });

});
