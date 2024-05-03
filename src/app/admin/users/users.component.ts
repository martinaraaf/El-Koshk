import { Component } from '@angular/core';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { RouterLink } from '@angular/router';
import { DashboardFooterComponent } from '../dashboard-footer/dashboard-footer.component';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { User } from '../../interface/adminDashboard';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DashboardSidebarComponent, DashboardFooterComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  students: any;
  directors: any;
  users: User[] = [];

  constructor(private _AdminService: AdminDashboardService) {
    const adminToken = sessionStorage.getItem('adminToken');

    this._AdminService.getUsersCount(adminToken).subscribe({
      next: (res) => {
        this.students = res['students count'];
        this.directors = res['directors count'];
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });

    this._AdminService.getUsersData().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });
  }
}
