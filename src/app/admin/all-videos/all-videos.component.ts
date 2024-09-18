import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { DashboardFooterComponent } from '../dashboard-footer/dashboard-footer.component';
import { Video, VideoCounts, VideosData } from '../../interface/adminDashboard';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-all-videos',
  standalone: true,
  imports: [DashboardSidebarComponent, DashboardFooterComponent, RouterLink],
  templateUrl: './all-videos.component.html',
  styleUrl: './all-videos.component.css',
})
export class AllVideosComponent {
  // variables
  allVideosNum: number = 0;
  approvedVideosNum: number = 0;
  pendingVideosNum: number = 0;
  deniedVideosNum: number = 0;
  allVideos: Video[] = [];
  filteredVideos: Video[] = [];

  constructor(
    private _AdminService: AdminDashboardService,
    private _Router: Router
  ) {}

  // fetching data at the start
  ngOnInit(): void {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken !== null) {
      this.fetchVideosCount(adminToken);
      this.fetchVideosData();
    }
    if (!adminToken) {
      this._Router.navigate(['/admin']);
    }
  }

  // display videos num
  private fetchVideosCount(adminToken: string): void {
    this._AdminService.getVideosCount(adminToken).subscribe({
      next: (res: VideoCounts) => {
        const {
          'All Videos': allVideosCountNum,
          'Approved Count': approvedCountNum,
          'Pending Count': pendingCountNum,
          'Denied Count': deniedVideosNum,
        } = res;
        this.allVideosNum = allVideosCountNum;
        this.approvedVideosNum = approvedCountNum;
        this.pendingVideosNum = pendingCountNum;
        this.deniedVideosNum = deniedVideosNum;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });
  }

  // Initially, display all videos
  fetchVideosData() {
    this._AdminService.getVideosData().subscribe({
      next: (data: VideosData) => {
        this.allVideos = data.results.reverse();
        this.filteredVideos = [...this.allVideos];
      },
      error: (error) => {
        console.error('Error fetching videos:', error);
      },
    });
  }

  // filter displayed videos
  filterVideos(category: string) {
    switch (category) {
      case 'all':
        // Display all videos
        this.filteredVideos = [...this.allVideos];
        break;
      case 'approved':
        // Filter approved videos
        this.filteredVideos = this.allVideos.filter(
          (video) => video.status === 'approved'
        );
        break;
      case 'pending':
        // Filter pending videos
        this.filteredVideos = this.allVideos.filter(
          (video) => video.status === 'pending'
        );
        break;
      case 'denied':
        // Filter denied videos
        this.filteredVideos = this.allVideos.filter(
          (video) => video.status === 'denied'
        );
        break;
      default:
        break;
    }
  }

  // Approve video function
  approveVideo(videoId: string) {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken !== null) {
      this._AdminService.approveVideo(adminToken, videoId).subscribe({
        next: (res) => {
          this.fetchVideosCount(adminToken);
          this.fetchVideosData();
        },
      });
    }
  }

  // Deny video function
  denyVideo(videoId: string) {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken !== null) {
      this._AdminService.denyVideo(adminToken, videoId).subscribe({
        next: (res) => {
          this.fetchVideosCount(adminToken);
          this.fetchVideosData();
        },
        error: (err) => {
          console.error('Error fetching data', err);
        },
      });
    }
  }
}
