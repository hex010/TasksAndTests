import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { LoginRequestModel } from '../models/authenticationModels/login-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup; //! - not null
  submitted = false;

  constructor( 
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)]] ///^(?=.*[a-zA-Z])(?=.*[0-9])/ - at least 1 number and 1 letter
    });
  }

  onSubmitLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const userData = new LoginRequestModel(email, password);

    this._auth.loginUser(userData).subscribe({
      error: err => { console.log(err) },
      next: response => { 
        localStorage.setItem('token', response.token);
        this.router.navigate(['/'])
      },
    });

  }
}
