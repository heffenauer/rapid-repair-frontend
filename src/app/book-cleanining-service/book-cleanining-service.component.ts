import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-cleanining-service',
  templateUrl: './book-cleanining-service.component.html',
})
export class BookCleaniningServiceComponent {
  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      special_req: [''],
    });

  }

  clickBookCleaning(): void {
    console.log(this.bookForm.value);
  }


}

