import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registrationForm!: FormGroup; //! - not null
  submitted = false;

  constructor( 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5), CustomValidators.atLeastOneLetterAndNumber]],
        password2: ['', Validators.required],
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
  }
}
