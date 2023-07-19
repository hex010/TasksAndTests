import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static matchPasswords(password1: string, password2: string) : ValidationErrors | null {
        return (formGroup: FormGroup) => {
            const passwordControl1 = formGroup.get(password1);
            const passwordControl2 = formGroup.get(password2);
            
            if (passwordControl1?.value !== passwordControl2?.value) {
                return { passwordsNotSame: true };
            }

            return null //validacija praejo sekmingai, klaida negrazinam
        };
    }

    static atLeastOneLetterAndNumber(control: FormControl): ValidationErrors | null {
        const value: string = control.value;
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);
    
        if (hasLetter && hasNumber) {
          return null; // validacija praejo
        } else {
          return { atLeastOneLetterAndNumber: true }; // validacija nepraejo
        }
      }

      static onlyLetters(control: FormControl): ValidationErrors | null {
        const value: string = control.value;
        if(!value) return null;
        
        const containsOnlyLetters = /^[A-Za-z]+$/.test(value);
    
        if (containsOnlyLetters) {
          return null; // validacija praejo
        } else {
          return { onlyLetters: true }; // validacija nepraejo
        }
      }
}