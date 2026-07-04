import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UsersComponent,
    ApplicationsComponent,
    SidebarComponent,
    AdminLoginComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
