import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  adminData: any = new BehaviorSubject(null);

  constructor(private _http: HttpClient, private _router: Router) {
    if (sessionStorage.getItem('adminToken') != null) {
      this.adminData;
    }
  }

  saveAdminData() {
    const adminToken = sessionStorage.getItem('adminToken');
    this.adminData.next(adminToken);

    console.log(adminToken);
  }

  loginAdmin(loginData: any): Observable<any> {
    return this._http.post('http://localhost:8000/admin/login', loginData);
  }

  logOutAdmin() {
    sessionStorage.removeItem('adminToken');
    this.adminData.next(null);
  }
}
