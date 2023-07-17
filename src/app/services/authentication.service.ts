import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequestModel } from "../models/authenticationModels/login-request.model";
import { RegisterRequestModel } from "../models/authenticationModels/register-request.model";
import { AuthResponseInterface } from "../models/authenticationModels/auth-response.interface";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
    private registerUrl = "http://192.168.0.187:8080/api/v1/register";
    private loginUrl = "http://192.168.0.187:8080/api/v1/login";

    constructor(private http: HttpClient, private router: Router) {}

    registerUser(userData: RegisterRequestModel) {
        return this.http.post<AuthResponseInterface>(this.registerUrl, userData);
    }

    loginUser(userData: LoginRequestModel) {
        return this.http.post<AuthResponseInterface>(this.loginUrl, userData);
    }

    isLoggedIn() {
        return !!localStorage.getItem('token'); // jeigu tokenas egzistuoja, grazins true, priesingai - false.
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/'])
    }

    getToken() {
        return localStorage.getItem('token')
    }
}