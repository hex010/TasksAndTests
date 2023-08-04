import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { LoginRequestModel } from '../models/authenticationModels/login-request.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private returnUrl!: string;
  public loginForm!: FormGroup; //! - not null
  public submitted = false;
  public loginErrors: string[] = [];

  constructor( 
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
    
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
      error: err => { 
        this.loginErrors = [];
        if(err.error.errors)
          err.error.errors.forEach((errorMessage: string) => {
            this.loginErrors.push(errorMessage);
          });
        else
          this.loginErrors.push("Unknown login error"); 
      },
      next: response => { 
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl(this.returnUrl);
      },
    });

  }
}
