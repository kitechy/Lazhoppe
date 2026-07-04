import { Component, OnInit } from '@angular/core';
import { StoreApplicationService } from 'src/app/core/services/store-application.service';
import { StoreApplication } from 'src/app/models/store-application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit {
  applications: StoreApplication[] = [];
  selectedApplication: StoreApplication | null = null;

  loading = false;
  showModal = false;

  constructor(private applicationService: StoreApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    this.loading = true;

    this.applicationService.getApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  approve(id: string) {
    this.applicationService
      .approveApplication(id)
      .subscribe(() => this.loadApplications());
  }

  reject(id: string) {
    const remarks = prompt('Reason for rejection') || '';

    this.applicationService
      .rejectApplication(id, remarks)
      .subscribe(() => this.loadApplications());
  }

  viewApplication(application: StoreApplication) {
    this.selectedApplication = application;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedApplication = null;
  }
}
