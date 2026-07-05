import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  stats: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
