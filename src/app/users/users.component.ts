
/*
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserListService} from "../services/user-list.service";
import {UserDTOInterface} from "../models/user-dto-interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();

  users: UserDTOInterface[] = [];
  user!: UserDTOInterface;
  userForm: FormGroup;

  constructor(private service: UserListService, formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loadUsers()
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  loadUsers(): void {
    this.service.getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(users => {
        this.users = users;
      });
  }

  getOneUser(id: number): void {
    this.service.getUser(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.userForm.setValue({
          name: user.name,
          surname: user.surname,
          age: user.age,
          email: user.email,
          password: user.password,
        })
        this.user = user;
      })
  }

  deleteUser(id: number): void {
    this.service.deleteUser(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadUsers();

      })
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.service.createUser(this.userForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();

      console.log('Form Submitted');
    } else {
      console.log('Form is invalid');
    }


  }

  updateUser(): void {
    this.service.updateUser(this.user.id, this.userForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadUsers();


      })


  }

}
*/
