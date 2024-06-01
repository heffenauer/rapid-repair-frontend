import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';  // Import the AuthService

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {  // Inject the AuthService
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
        role: [''],
        country: [''],
        timezone: [''],
        website: [''],
        bio: [''],
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
      const formValues = this.registerForm.value;

      const registrationData = {
        ...formValues,
        password: formValues.password,  // Send plaintext password
      };

      console.log('Registration data with plaintext password:', registrationData);

      this.authService.register(registrationData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Handle successful registration, e.g., redirect to login page
        },
        (error) => {
          console.error('Registration error:', error);
          // Handle registration error
        }
      );
    } else {
      console.error('Form is not valid', this.registerForm.errors);
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
