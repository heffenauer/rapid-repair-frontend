import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserDTOInterface } from '../models/user-dto-interface';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
})
export class ProfilepageComponent implements OnInit {
  form: FormGroup;
  userId: number | null = null; // Store the user ID here

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
      (data: UserDTOInterface) => {
        this.userId = data.id; // Store user ID
        this.form.patchValue({
          firstName: data.name, // Assuming name maps to firstName
          lastName: data.surname,
          email: data.email,
          role: data.role || '', // Provide default value if key is not present
          country: data.country || '',
          timezone: data.timezone || '',
          website: data.website || '',
          bio: data.bio || ''
        });
      },
      (error) => {
        console.error('Failed to load user info', error);
      }
    );
  }

  submitForm(): void {
    if (this.form.valid) {
      const user: UserDTOInterface = {
        id: this.userId || 0, // Get user ID from stored value or set default
        name: this.form.value.firstName, // Mapping back to DTO structure
        surname: this.form.value.lastName,
        email: this.form.value.email,
        password: '', // Ensure password is not sent unintentionally
        role: this.form.value.role,
        country: this.form.value.country,
        timezone: this.form.value.timezone,
        website: this.form.value.website,
        bio: this.form.value.bio
      };
      this.authService.updateUserInfo(user).subscribe(
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
