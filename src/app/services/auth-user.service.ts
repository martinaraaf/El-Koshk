import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private userName: any;
  
  constructor(private _http: HttpClient, private _router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.userToken;
    }
  }

  userToken: any = new BehaviorSubject(null);

  saveUserData() {
    const userToken = localStorage.getItem('userToken');
    this.userToken.next(userToken);
  }

  registerUser(signupData: any): Observable<any> {
    return this._http.post(`http://localhost:8000/users`, signupData);
  }

  // loginUser(loginData: any): Observable<any> {
  //   return this._http.post('http://localhost:8000/users/login', loginData);
  // }

  loginUser(loginData: any): Observable<any> {
    return this._http.post('http://localhost:8000/users/login', loginData).pipe(
      tap((response: any) => {
        // Assuming the user name is returned in the response
        this.userName = response.user.name;
      })
    );
  }

  getUserName(): string {
    return this.userName;
  }

  signOutUser() {
    localStorage.removeItem('userToken');
    this.userToken.next(null);
    this._router.navigate(['/login']);
  }

  addNewVideo(youtubeUrl: object, userToken: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`,
    });
    const requestOptions = {
      headers: headers,
    };

    return this._http.post(
      'http://localhost:8000/video/add',
      youtubeUrl,
      requestOptions
    );
  }

  getUserData(userToken: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`,
    });

    const requestOptions = {
      headers: headers,
    };

    return this._http.get('http://localhost:8000/user/details', requestOptions);
  }
}
