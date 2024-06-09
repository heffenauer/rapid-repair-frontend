import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Adjust the path as needed

@Component({
  selector: 'app-service-details-cleaning',
  templateUrl: './service-details-cleaning.component.html',
})
export class ServiceDetailsCleaningComponent {

  constructor(private authService: AuthService, private router: Router) {}

  onBookNow(route: string): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([route]);
    } else {
      alert('You must be logged in to book a service');
    }
  }
}
