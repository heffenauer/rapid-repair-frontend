import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
})
export class ProfilepageComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
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
    this.userService.getUserProfile().subscribe(user => {
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        country: user.country,
        timezone: user.timezone,
        website: user.website,
        bio: user.bio
      });
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      // Optionally, you can implement the form submission logic here.
    } else {
      console.log('Form is invalid');
    }
  }
}
