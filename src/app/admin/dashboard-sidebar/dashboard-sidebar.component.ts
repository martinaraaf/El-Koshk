import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthAdminService } from '../../services/auth-admin.service';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css',
})
export class DashboardSidebarComponent {
  isSidebarExpanded: boolean = true;

  constructor(private AuthService: AuthAdminService) {}

  // sidebar toggle
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  // LogOut Admin
  logOut() {
    this.AuthService.logOutAdmin();
  }
}
