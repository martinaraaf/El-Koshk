import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { AuthAdminService } from '../../services/auth-admin.service';

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

  constructor(
    private _Router: Router,
    private http: HttpClient,
    private AuthService: AuthAdminService
  ) {}

  loginAdminForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
    ]),
  });

  submitlogin() {
    const formdata = new FormData();

    formdata.append('email', this.loginAdminForm.get('email')?.value);
    formdata.append('password', this.loginAdminForm.get('password')?.value);

    this.AuthService.loginAdmin(formdata).subscribe({
      next: (res) => {
        sessionStorage.setItem('adminToken', res.token);
        this._Router.navigate(['admin/dashboard']);
      },
      error: (err) => console.log(err.error.error),

      complete: () => {},
    });
  }
}
