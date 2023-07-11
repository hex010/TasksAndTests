import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)]], ///^(?=.*[a-zA-Z])(?=.*[0-9])/ - at least 1 number and 1 letter
        password2: ['', [Validators.required, matchPasswords('password', 'password2')]],
        agreement: ['', Validators.required]
    });
  }

  onSubmitRegister() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
  }
}

export function matchPasswords(passwordControlName1: string, passwordControlName2: string,) {
  //grazina arrow funkcija, kuri argumente priima AbstractControl, kadangi validatoriai priima objekta tokio tipo
  return (control: AbstractControl) => {
    const password1 = control.parent?.get(passwordControlName1);
    const password2 = control.parent?.get(passwordControlName2);

    if (password1?.value !== password2?.value) {
      return { passwordsNotSame: true };
    }

    return null; //validacija praejo sekmingai
  };
}
