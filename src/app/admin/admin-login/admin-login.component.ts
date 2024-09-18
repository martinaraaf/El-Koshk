import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { AuthAdminService } from '../../services/auth-admin.service';
import { LoginAdmin } from '../../interface/adminDashboard';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  error: string = '';
  isLoading: boolean = false;
  invalidCredentials: string = '';

  constructor(private _Router: Router, private AuthService: AuthAdminService) {
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken !== null) {
      this._Router.navigate(['admin/dashboard']);
    }
  }

  loginAdminForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submitlogin() {
    const formdata = new FormData();

    formdata.append('email', this.loginAdminForm.get('email')?.value);
    formdata.append('password', this.loginAdminForm.get('password')?.value);

    this.isLoading = true;
    this.AuthService.loginAdmin(formdata).subscribe({
      next: (res: LoginAdmin) => {
        this.isLoading = false;
        sessionStorage.setItem('adminToken', res.token);
        sessionStorage.setItem('isSidebarExpanded', 'true');
        this._Router.navigate(['admin/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error.error === 'Invalid credentials') {
          this.invalidCredentials = 'Invalid credentials';
        }
      },
    });
  }
}
