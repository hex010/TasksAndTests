import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom.validators';
import { RegisterRequestModel } from '../models/authenticationModels/register-request.model';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registrationForm!: FormGroup; //! - not null
  submitted = false;
  public registrationErrors: string[] = [];

  constructor( 
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
        password: ['', [Validators.required, Validators.minLength(5), CustomValidators.atLeastOneLetterAndNumber]],
        password2: ['', Validators.required],
        firstname: ['', [Validators.required, CustomValidators.onlyLetters, Validators.maxLength(50)]],
        lastname: ['', [Validators.required, CustomValidators.onlyLetters, Validators.maxLength(50)]],
        agreement: ['', Validators.requiredTrue]
    }, {
      validator: [CustomValidators.matchPasswords('password', 'password2')]
    });
  }

  onSubmitRegister() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;
    const firstname = this.registrationForm.value.firstname;
    const lastname = this.registrationForm.value.lastname;

    const userData = new RegisterRequestModel(email, password, firstname, lastname);

    this._auth.registerUser(userData).subscribe({
      error: err => { 
        this.registrationErrors = [];
        if(err.error.errors)
          err.error.errors.forEach((errorMessage: string) => {
            this.registrationErrors.push(errorMessage);
          });
        else
          this.registrationErrors.push("Unknown login error"); 
       },
      next: response => { 
        localStorage.setItem('token', response.token);
        this.router.navigate(['/'])
      },
    });

  }
}
