import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";
import { AuthService } from '../services/auth.service';  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    public authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          this.currentRoute = route.routeConfig?.path!;
          console.log(this.currentRoute);
          return route;
        })
      ).subscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);  // Redirect to home or login page after logout
  }
}
