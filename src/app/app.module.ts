import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ProfilepageComponent} from './profilepage/profilepage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterComponent} from './footer/footer.component';
import {RegisterComponent} from './register/register.component';
import {ServiceDetailsCleaningComponent} from "./service-details-cleaning/service-details-cleaning.component";
import {BookCleaniningServiceComponent} from "./book-cleanining-service/book-cleanining-service.component";
import {UserListService} from "./services/user-list.service";
import {UsersComponent} from './users/users.component';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginPageComponent,
    ProfilepageComponent,
    FooterComponent,
    RegisterComponent,
    ServiceDetailsCleaningComponent,
    BookCleaniningServiceComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    UserListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
