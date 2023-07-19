import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Gender } from '../models/Gender.enum';
import { MyProfileService } from '../services/my-profile.service';
import { MyProfileModel } from '../models/my-profile.model';
import { CustomValidators } from '../custom.validators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  myProfileForm!: FormGroup; //! - not null
  submitted = false;
  genders = Object.values(Gender);
  
  ngOnInit() {
    this.myProfileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
      firstname: ['', [Validators.required, CustomValidators.onlyLetters, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, CustomValidators.onlyLetters, Validators.maxLength(50)]],
      selectedGender: [Gender.UNDISCLOSED, Validators.required]
  });

    this.profileService.getProfileData().subscribe({
      error: err => { console.log(err) },
      next: response => { 
        this.myProfileForm.patchValue({
          email: response.email,
          firstname: response.firstname,
          lastname: response.lastname,
          selectedGender: Gender[response.gender as keyof typeof Gender]
        });
      }
    });
  }

  constructor( 
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private profileService: MyProfileService
  ) {}

  onSubmitUpdate() {
    if (this.myProfileForm.invalid) {
      return;
    }

    const email = this.myProfileForm.value.email;
    const firstname = this.myProfileForm.value.firstname;
    const lastname = this.myProfileForm.value.lastname;
    const gender = this.profileService.getGenderKeyByValue(this.myProfileForm.value.selectedGender);
    
    const myProfileModel = new MyProfileModel(email, firstname, lastname, gender);

    this.profileService.updateProfileData(myProfileModel).subscribe({
      error: err => { console.log(err); window.alert('error'); },
      next: response => { 
        window.alert(response)
      }
    });

  }
  
}
