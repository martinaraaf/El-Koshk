import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  RegisterFormData,
  UserLoginResponse,
  UserPortfolioResponse,
  UserSignupResponse,
  loginFormData,
} from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  // private userName: string = '';
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

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

  registerUser(signupData: RegisterFormData): Observable<UserSignupResponse> {
    return this._http.post<UserSignupResponse>(
      `http://localhost:8000/users`,
      signupData
    );
  }

  // loginUser(loginData: any): Observable<any> {
  //   return this._http.post('http://localhost:8000/users/login', loginData);
  // }

  loginUser(loginData: loginFormData): Observable<UserLoginResponse> {
    return this._http
      .post<UserLoginResponse>('http://localhost:8000/users/login', loginData)
      .pipe(
        tap((response: UserLoginResponse) => {
          // Assuming the user name is returned in the response
          // this.userName = response.user.name;
          this.userNameSubject.next(response.user.name);
        })
      );
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }

  signOutUser() {
    localStorage.removeItem('userToken');
    this.userToken.next(null);
    this._router.navigate(['/login']);
  }

  addNewVideo(youtubeUrl: any, userToken: any): Observable<any> {
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

  getUserData(userToken: string | null): Observable<UserPortfolioResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`,
    });

    const requestOptions = {
      headers: headers,
    };

    return this._http.get<UserPortfolioResponse>(
      'http://localhost:8000/user/details',
      requestOptions
    );
  }
}
