import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthUserService } from '../services/auth-user.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  error: string = '';
  emailAlreadyTaken: boolean = false;

  constructor(private _Router: Router, private _AuthUser: AuthUserService) {}

  registerform: FormGroup = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    type: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:0)?(12|10|11|15)\d{8}$/),
    ]),
  });

  submitRegistration(registerform: FormGroup) {
    this.emailAlreadyTaken = false;
    const formdata = new FormData();

    const firstName = this.registerform.get('first_name')?.value;
    const lastName = this.registerform.get('last_name')?.value;
    const fullName = `${firstName} ${lastName}`;

    formdata.append('name', fullName);
    formdata.append('email', this.registerform.get('email')?.value);
    formdata.append('password', this.registerform.get('password')?.value);
    formdata.append('type', this.registerform.get('type')?.value);
    formdata.append(
      'phone_number',
      this.registerform.get('phoneNumber')?.value
    );

    this._AuthUser.registerUser(formdata).subscribe({
      next: (res) => {
        console.log('User registered successfully');
        console.log(res);

        // navigate him to login
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);

        if (err.error.message === 'The email has already been taken.') {
          this.emailAlreadyTaken = true;
        }
      },
      complete: () => {},
    });
  }
}
