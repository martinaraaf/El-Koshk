import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
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
  adminEmail: string = '';

  constructor(private _AuthService: AuthAdminService, private _Router: Router) {
    this.adminEmail = this._AuthService.getAdminEmail();
  }

  ngOnInit() {
    const storedState = sessionStorage.getItem('isSidebarExpanded');
    this.isSidebarExpanded = storedState === 'true';
  }

  // old
  // toggleSidebar() {
  //   this.isSidebarExpanded = !this.isSidebarExpanded;
  // }

  // sidebar toggle
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    sessionStorage.setItem(
      'isSidebarExpanded',
      this.isSidebarExpanded ? 'true' : 'false'
    );
  }

  // LogOut Admin
  logOut() {
    this._AuthService.logOutAdmin();
    this._Router.navigate(['/home']);
  }
}
