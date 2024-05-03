import { adminGuard } from './../../guards/admin.guard';
import { Component } from '@angular/core';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { RouterLink } from '@angular/router';
import { DashboardFooterComponent } from '../dashboard-footer/dashboard-footer.component';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DashboardSidebarComponent, RouterLink, DashboardFooterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  totalUsers: number = 0;
  totalVideos: number = 0;

  constructor(private _AdminService: AdminDashboardService) {
    const adminToken = sessionStorage.getItem('adminToken');

    // Total users count
    this._AdminService.getUsersCount(adminToken).subscribe({
      next: (res) => {
        this.totalUsers = res.count;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });

    // Total videos count
    this._AdminService.getVideosCount(adminToken).subscribe({
      next: (res) => {
        this.totalVideos = res['Approved Count']; // Update this line
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });
  }
}
