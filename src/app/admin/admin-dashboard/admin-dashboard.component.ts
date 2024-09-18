import { Component } from '@angular/core';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { DashboardFooterComponent } from '../dashboard-footer/dashboard-footer.component';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { UsersCounts, VideoCounts } from '../../interface/adminDashboard';

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

  // old
  // constructor(private _AdminService: AdminDashboardService) {
  //   const adminToken = sessionStorage.getItem('adminToken');

  //   if (adminToken !== null) {
  //     // Total users count
  //     this._AdminService.getUsersCount(adminToken).subscribe({
  //       next: (res: UsersCounts) => {
  //         this.totalUsers = res.count;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching data', err);
  //       },
  //       complete: () => {},
  //     });

  //     // Total videos count
  //     this._AdminService.getVideosCount(adminToken).subscribe({
  //       next: (res: VideoCounts) => {
  //         this.totalVideos = res['Approved Count'];
  //       },
  //       error: (err) => {
  //         console.error('Error fetching data', err);
  //       },
  //       complete: () => {},
  //     });
  //   }
  // }

  constructor(
    private _AdminService: AdminDashboardService,
    private _Router: Router
  ) {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken !== null) {
      this.fetchUsersCount(adminToken);
      this.fetchVideosCount(adminToken);
    }
    if (!adminToken) {
      this._Router.navigate(['/admin']);
    }
  }

  private fetchUsersCount(adminToken: string): void {
    this._AdminService.getUsersCount(adminToken).subscribe({
      next: (res: UsersCounts) => {
        this.totalUsers = res.count;
      },
      error: this.handleError.bind(this),
      complete: () => {},
    });
  }

  private fetchVideosCount(adminToken: string): void {
    this._AdminService.getVideosCount(adminToken).subscribe({
      next: (res: VideoCounts) => {
        this.totalVideos = res['Approved Count'];
      },
      error: this.handleError.bind(this),
      complete: () => {},
    });
  }

  private handleError(err: any): void {
    console.error('Error fetching data', err);
  }
}
