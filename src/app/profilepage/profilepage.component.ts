import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
})
export class ProfilepageComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      country: ['', Validators.required],
      timezone: ['', Validators.required],
      website: ['', Validators.pattern('https?://.+')],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.form.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          country: data.country,
          timezone: data.timezone,
          website: data.website,
          bio: data.bio
        });
      },
      (error) => {
        console.error('Failed to load user info', error);
      }
    );
  }

  submitForm(): void {
    if (this.form.valid) {
      this.authService.updateUserInfo(this.form.value).subscribe(
        (response) => {
          console.log('User info updated successfully', response);
        },
        (error) => {
          console.error('Failed to update user info', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
