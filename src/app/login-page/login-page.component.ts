import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Route } from "../constants/routes";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  form: FormGroup;
  errorMessage: string = '';

  constructor(formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  clickButton(): void {
    if (this.form.valid) {
      const credentials = this.form.value;
      this.authService.login(credentials).subscribe(response => {
        if (response && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.router.navigate([Route.profile]);
        } else {
          this.errorMessage = 'Failed to retrieve token. Please try again.';
        }
      }, error => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        localStorage.removeItem('token'); // Ensure token is not set on failure
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      this.form.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

}
