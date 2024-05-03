import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { DashboardFooterComponent } from '../dashboard-footer/dashboard-footer.component';
import {
  Video,
  VideoCounts,
  VideosResponse,
} from '../../interface/adminDashboard';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-all-videos',
  standalone: true,
  imports: [DashboardSidebarComponent, DashboardFooterComponent, RouterLink],
  templateUrl: './all-videos.component.html',
  styleUrl: './all-videos.component.css',
})
export class AllVideosComponent {
  approvedVideos: any;
  pendingVideos: any;
  videos: Video[] = [];

  constructor(private _AdminService: AdminDashboardService) {
    const adminToken = sessionStorage.getItem('adminToken');

    this._AdminService.getVideosCount(adminToken).subscribe({
      next: (res) => {
        this.approvedVideos = res['Approved Count'];
        this.pendingVideos = res['Pending Count'];
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });

    this._AdminService.getVideosData().subscribe({
      next: (data: VideosResponse) => {
        this.videos = data.results;
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });
  }
}
