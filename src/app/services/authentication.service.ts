import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequestModel } from "../models/authenticationModels/login-request.model";
import { RegisterRequestModel } from "../models/authenticationModels/register-request.model";

@Injectable()
export class AuthenticationService {
    private registerUrl = "http://localhost:8080/api/v1/register";
    private loginUrl = "http://localhost:8080/api/v1/login";

    constructor(private http: HttpClient) {}

    registerUser(userData: RegisterRequestModel) {
        return this.http.post(this.registerUrl, userData);
    }

    loginUser(userData: LoginRequestModel) {
        return this.http.post(this.loginUrl, userData);
    }
}