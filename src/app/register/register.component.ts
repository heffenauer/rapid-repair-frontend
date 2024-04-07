import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''], // No initial validators here; validation is done through the form-level custom validator below
      },
      { validator: this.checkPasswords }
    );
  }

  // Custom validator to check that both password and confirm password fields match
  checkPasswords(group: FormGroup): { [key: string]: any } | null {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
      // TODO: Call a backend API to handle the registration logic.
    } else {
      console.error('Form is not valid', this.registerForm.errors);
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
