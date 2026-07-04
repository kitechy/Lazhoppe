import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreApplicationService } from 'src/app/core/services/store-application.service';
import { StoreApplication } from 'src/app/models/store-application';


@Component({
  selector: 'app-apply-store',
  templateUrl: './apply-store.component.html',
  styleUrls: ['./apply-store.component.css'],
})
export class ApplyStoreComponent {
  application: StoreApplication = {
    storeName: '',
    description: '',
    address: '',
    phone: '',
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private applicationService: StoreApplicationService,
    private router: Router
  ) {}

  submitApplication() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.applicationService.submitApplication(this.application).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage =
          'Application submitted successfully! Please wait for admin approval.';
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err.error?.message || 'Failed to submit application.';
      },
    });
  }
}