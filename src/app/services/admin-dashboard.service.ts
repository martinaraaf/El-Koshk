import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { VideosResponse } from '../interface/adminDashboard';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  adminToken: any = new BehaviorSubject(null);

  constructor(private http: HttpClient, private _router: Router) {
    if (sessionStorage.getItem('adminToken') != null) {
      this.adminToken;
    }
  }

  // sending admintoken in request header
  private getRequestOptions(adminToken: any): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${adminToken}`,
    });
    return { headers: headers };
  }

  // Total users count
  getUsersCount(adminToken: any): Observable<any> {
    const requestOptions = this.getRequestOptions(adminToken);
    return this.http.get(`http://localhost:8000/user/count`, requestOptions);
  }

  // Total videos count
  getVideosCount(adminToken: any): Observable<any> {
    const requestOptions = this.getRequestOptions(adminToken);
    return this.http.get(`http://localhost:8000/video/count`, requestOptions);
  }

  // Total users data
  getUsersData(): Observable<any> {
    return this.http.get(`http://localhost:8000/users`);
  }

  // Total videos data
  getVideosData(): Observable<VideosResponse> {
    return this.http.get<VideosResponse>(
      `http://localhost:8000/video/allVideos`
    );
  }
}
