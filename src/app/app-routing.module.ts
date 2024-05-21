import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProfilepageComponent } from "./profilepage/profilepage.component";
import { RegisterComponent } from "./register/register.component";
import { ServiceDetailsCleaningComponent } from "./service-details-cleaning/service-details-cleaning.component";
import { BookCleaniningServiceComponent } from "./book-cleanining-service/book-cleanining-service.component";
import { UsersComponent } from "./users/users.component";
import { ServicesComponent } from "./servicelistinghtml/services.component";
import { Route } from "./constants/routes";
import { ServiceListService } from './services/service-list.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfilepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'serviceclean', component: ServiceDetailsCleaningComponent },
  { path: 'bookclean', component: BookCleaniningServiceComponent },
  { path: 'services', component: ServicesComponent},
  { path: Route.users, component: UsersComponent },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
