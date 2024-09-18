import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';
import { UserLoginResponse, loginFormData } from '../interface/user';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;
  loginForm!: FormGroup;
  isLogged: boolean = false;
  invalidCredentials: boolean = false;

  constructor(private router: Router, private authUser: AuthUserService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.required,
      ]),
    });

    // will be handled later
    this.authUser.userToken.subscribe({
      next: () => {
        if (this.authUser.userToken.getValue() != null) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
    });
  }

  onLogin() {
    this.isLoading = true;

    const formdata: loginFormData = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.invalidCredentials = false;

    this.authUser.loginUser(formdata).subscribe({
      next: (res: UserLoginResponse) => {
        this.isLoading = false;
        localStorage.setItem('userToken', res.token);
        this.authUser.saveUserData();

        this.router.navigate(['/myportfolio']);

        // this.loginForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error.error === 'Invalid credentials') {
          this.invalidCredentials = true;
        }
      },
    });
  }
}
