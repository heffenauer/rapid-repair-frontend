import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-cleanining-service',
  templateUrl: './book-cleanining-service.component.html',
})
export class BookCleaniningServiceComponent {
  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.bookForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      special_req: [''],
    });
  }

  clickBookCleaning(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    console.log(this.bookForm.value);
    // Proceed with booking logic
  }
}
