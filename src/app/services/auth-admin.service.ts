import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginAdmin } from '../interface/adminDashboard';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  private adminEmail: string = '';

  // admin token
  adminToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private _http: HttpClient) {
    const storedToken = sessionStorage.getItem('adminToken');
    if (storedToken !== null) {
      this.adminToken.next(storedToken); // Set the initial value of adminToken
    }
  }

  // login admin
  loginAdmin(loginData: object): Observable<LoginAdmin> {
    return this._http
      .post<LoginAdmin>('http://localhost:8000/admin/login', loginData)
      .pipe(
        tap((res: LoginAdmin) => {
          this.adminEmail = res.user.email;
        })
      );
  }

  // get admin email
  getAdminEmail(): string {
    return this.adminEmail;
  }

  //logout admin and remove token
  logOutAdmin() {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('isSidebarExpanded');
    this.adminToken.next(null);
  }
}
