import {Component} from '@angular/core';
import {Subject} from "rxjs";
import {UserDTOInterface} from "../models/user-dto-interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',

})
export class ProfilepageComponent {


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      photo: [null],
      role: ['', Validators.required],
      country: ['', Validators.required],
      timezone: ['', Validators.required],
      website: ['', Validators.pattern('https?://.+')],
      bio: ['']
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
