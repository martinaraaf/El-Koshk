import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
  VideosData,
  UsersCounts,
  VideoCounts,
  User,
  StatusChangeResponse,
} from '../interface/adminDashboard';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  // admin token
  adminToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient, private _router: Router) {
    const storedToken = sessionStorage.getItem('adminToken');
    if (storedToken !== null) {
      this.adminToken.next(storedToken); // Set the initial value of adminToken
    }
  }

  // sending admintoken in request header
  private getRequestOptions(adminToken: string): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${adminToken}`,
    });
    return { headers: headers };
  }

  // Total users count
  getUsersCount(adminToken: string): Observable<UsersCounts> {
    const requestOptions = this.getRequestOptions(adminToken);
    return this.http.get<UsersCounts>(
      `http://localhost:8000/user/count`,
      requestOptions
    );
  }

  // Total videos count
  getVideosCount(adminToken: string): Observable<VideoCounts> {
    const requestOptions = this.getRequestOptions(adminToken);
    return this.http.get<VideoCounts>(
      `http://localhost:8000/video/count`,
      requestOptions
    );
  }

  // Total users data
  getUsersData(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8000/users`);
  }

  // Total videos data
  getVideosData(): Observable<VideosData> {
    return this.http.get<VideosData>(`http://localhost:8000/video/allVideos`);
  }

  // Approve Video
  approveVideo(
    adminToken: string,
    videoId: string
  ): Observable<StatusChangeResponse> {
    const requestOptions = this.getRequestOptions(adminToken);
    return this.http.post<StatusChangeResponse>(
      `http://localhost:8000/admin/video/verify/${videoId}`,
      {},
      requestOptions
    );
  }

  // Deny Video
  denyVideo(
    adminToken: string,
    videoId: string
  ): Observable<StatusChangeResponse> {
    const requestOptions = this.getRequestOptions(adminToken);
    return this.http.post<StatusChangeResponse>(
      `http://localhost:8000/admin/video/deny/${videoId}`,
      {},
      requestOptions
    );
  }

    // Activate User
    // adjust the url 
    // activateUser(
    //   adminToken: string,
    //   userId: number
    // ): Observable<StatusChangeResponse> {
    //   const requestOptions = this.getRequestOptions(adminToken);
    //   return this.http.post<StatusChangeResponse>(
    //     `http://localhost:8000/admin/user/verify/${userId}`,
    //     {},
    //     requestOptions
    //   );
    // }

    // Suspend User
    // adjust the url 
    // suspendUser(
    //   adminToken: string,
    //   userId: number
    // ): Observable<StatusChangeResponse> {
    //   const requestOptions = this.getRequestOptions(adminToken);
    //   return this.http.post<StatusChangeResponse>(
    //     `http://localhost:8000/admin/user/suspend/${userId}`,
    //     {},
    //     requestOptions
    //   );
    // }
}
