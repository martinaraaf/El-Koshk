import { Component } from '@angular/core';
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
export class LoginPageComponent {
  error: string = '';
  isLogged: boolean = false;

  invalidCredentials: boolean = false;

  constructor(private _Router: Router, private _AuthUser: AuthUserService) {}

  ngOnInit(): void {
    this._AuthUser.userToken.subscribe({
      next: () => {
        if (this._AuthUser.userToken.getValue() != null) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
    });
  }

  loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submitLogin(loginform: FormGroup) {
    const formdata = new FormData();
    this.invalidCredentials = false;

    const email = this.loginform.get('email')?.value;
    const password = this.loginform.get('password')?.value;

    formdata.append('email', this.loginform.get('email')?.value);
    formdata.append('password', this.loginform.get('password')?.value);

    this._AuthUser.loginUser(formdata).subscribe({
      next: (res) => {
        // console.log('user logged in');
        // console.log(res);

        // store token in local storage
        localStorage.setItem('userToken', res.token);
        this._AuthUser.saveUserData();

        // navigate to home or profile
        this._Router.navigate(['/myportfolio']);

        this.loginform.reset();
      },
      error: (err) => {
        console.log(err);
        if (err.error.error === 'Invalid credentials') {
          this.invalidCredentials = true;
        }
      },
      complete: () => {},
    });
  }
}
