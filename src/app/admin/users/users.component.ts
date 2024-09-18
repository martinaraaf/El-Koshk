import { Component } from '@angular/core';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { DashboardFooterComponent } from '../dashboard-footer/dashboard-footer.component';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { User, UsersCounts } from '../../interface/adminDashboard';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DashboardSidebarComponent, DashboardFooterComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  students: number = 0;
  directors: number = 0;
  users: User[] = [];

  constructor(
    private _AdminService: AdminDashboardService,
    private _Router: Router
  ) {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken !== null) {
      this.fetchUsersCount(adminToken);
      this.fetchUserssData();
    }
    if (!adminToken) {
      this._Router.navigate(['/admin']);
    }
  }

  private fetchUsersCount(adminToken: string): void {
    this._AdminService.getUsersCount(adminToken).subscribe({
      next: (res: UsersCounts) => {
        const { 'students count': students, 'directors count': directors } =
          res;
        this.students = students;
        this.directors = directors;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });
  }

  private fetchUserssData(): void {
    this._AdminService.getUsersData().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      },
      complete: () => {},
    });
  }

  activateUserAcc(userId: number) {}

  suspendUserAcc(userId: number) {}
}
