// /src/app/services/services.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { ServiceListService } from "../services/service-list.service";
import { ServiceDTOInterface } from "../models/service-dto-interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-services',
  templateUrl: 'services.component.html',
})
export class ServicesComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();

  services: ServiceDTOInterface[] = [];
  service!: ServiceDTOInterface;
  serviceForm: FormGroup;

  constructor(private serviceListService: ServiceListService, formBuilder: FormBuilder) {
    this.serviceForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadServices(): void {
    this.serviceListService.getAllServices()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(services => {
        this.services = services;
      });
  }

  getOneService(id: number): void {
    this.serviceListService.getService(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(service => {
        this.serviceForm.setValue({
          name: service.name,
          description: service.description,
          price: service.price,
        });
        this.service = service;
      });
  }

  deleteService(id: number): void {
    this.serviceListService.deleteService(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadServices();
      });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.serviceListService.createService(this.serviceForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.loadServices();
          this.serviceForm.reset();
        });

      console.log('Form Submitted');
    } else {
      console.log('Form is invalid');
    }
  }

  updateService(): void {
    if (this.serviceForm.valid) {
      this.serviceListService.updateService(this.service.id, this.serviceForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.loadServices();
          this.serviceForm.reset();
        });
    }
  }
}

