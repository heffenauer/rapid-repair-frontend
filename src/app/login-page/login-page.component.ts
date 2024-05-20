import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Route} from "../constants/routes";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  form: FormGroup;

  constructor(formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      email: [],
      password: []
    })
  }


  clickButton(): void {
    console.log(this.form.value);
    this.router.navigate([Route.profile])
  }


}


