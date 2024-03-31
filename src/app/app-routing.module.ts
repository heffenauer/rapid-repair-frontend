import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {ProfilepageComponent} from "./profilepage/profilepage.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfilepageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
