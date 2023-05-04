import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup; //! - not null
  submitted = false;
  get f() { return this.loginForm.controls; }
  constructor( 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)]] ///^(?=.*[a-zA-Z])(?=.*[0-9])/ - at least 1 number and 1 letter
    });
  }

  onSubmitLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
  }
}
