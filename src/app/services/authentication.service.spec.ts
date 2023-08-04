import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "./authentication.service";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterRequestModel } from "../models/authenticationModels/register-request.model";
import { AuthResponseInterface } from "../models/authenticationModels/auth-response.interface";
import { LoginRequestModel } from "../models/authenticationModels/login-request.model";
import { Router } from "@angular/router";

describe('AuthenticationService', () => {
    let authService: AuthenticationService;
    let httpMock: HttpTestingController;
    let router: Router;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [AuthenticationService],
          imports: [HttpClientTestingModule, RouterTestingModule]
        });
    
        authService = TestBed.inject(AuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
      });
    
      it('should be created', () => {
        expect(authService).toBeTruthy();
      });

      it('should register a user', () => {
        const mockUserData: RegisterRequestModel = {
            email: 'test@example.com',
            password: 'testpassword',
            firstname: 'John',
            lastname: 'Doe'
        };
        
        const mockResponse = {
            token: 'mockToken'
        };
          
        authService.registerUser(mockUserData).subscribe(response => {
          expect(response).toEqual(mockResponse);
        });
    
        const req = httpMock.expectOne({
            method: 'POST',
            url: 'http://192.168.0.187:8080/api/v1/register'
        });

        req.flush(mockResponse);
      });

      it('should login a user', () => {
        const mockUserData: LoginRequestModel = {
            email: 'test@example.com',
            password: 'testpassword',
        };
        
        const mockResponse = {
            token: 'mockToken'
        };
          
        authService.loginUser(mockUserData).subscribe(response => {
          expect(response).toEqual(mockResponse);
        });
    
        const req = httpMock.expectOne({
            method: 'POST',
            url: 'http://192.168.0.187:8080/api/v1/login'
        });

        req.flush(mockResponse);
      });
    
      it('should remove token from localStorage and navigate to /', () => {
        const removeItemSpy = spyOn(localStorage, 'removeItem');
        const navigateSpy = spyOn(router, 'navigate');
      
        authService.logout();
      
        expect(removeItemSpy).toHaveBeenCalledWith('token');
        expect(navigateSpy).toHaveBeenCalledWith(['/']);
      });

      it('should return the token', () => {
        const expectedToken = 'tken5565';
        localStorage.setItem('token', expectedToken);

        const result = authService.getToken();
    
        expect(result).toBe(expectedToken);
      });

      it('should be logged in if token exists', () => {
        const expectedToken = 'tken5565';
        localStorage.setItem('token', expectedToken);

        const result = authService.isLoggedIn();
    
        expect(result).toBeTrue();
      });
});