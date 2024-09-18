import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthUserService } from '../services/auth-user.service';
import { RegisterFormData } from '../interface/user';
import { passwordMatchValidator } from './validators';

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
export class RegisterPageComponent implements OnInit {
  isLoading: boolean = false;
  registerForm!: FormGroup;
  emailAlreadyTaken: boolean = false;
  profilePhoto!: File;
  // reachMethods = ['social_media', 'friend', 'advertisement', 'other'];

  constructor(private _Router: Router, private _AuthUser: AuthUserService) {}

  ngOnInit(): void {
    // form/inputs validation
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        age: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(8|9|1[0-8])$/),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, Validators.required),
        mobileNumber: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ]),
        parentNumber: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ]),
        address: new FormControl(null, Validators.required),
        talent: new FormControl(null, Validators.required),
        reachMethod: new FormControl(null, Validators.required),
        artisticExperience: new FormControl(null, Validators.required),
        prevWorkLink: new FormControl(
          null
          // to ask later
          // Validators.pattern(
          //   '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})'
          // )
        ),
        photo: new FormControl('', Validators.required),
      },
      { validators: passwordMatchValidator() }
    );
  }
  onRegister() {
    this.isLoading = true;
    // this.emailAlreadyTaken = false;

    // creating the form object for backend
    // working fine
    const formData: RegisterFormData = {
      name: this.registerForm.controls['name'].value,
      age: this.registerForm.controls['age'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      mobileNumber: this.registerForm.controls['mobileNumber'].value,
      parentNumber: this.registerForm.controls['parentNumber'].value,
      address: this.registerForm.controls['address'].value,
      talent: this.registerForm.controls['talent'].value,
      reachMethod: this.registerForm.controls['reachMethod'].value,
      artisticExperience:
        this.registerForm.controls['artisticExperience'].value,
      ...(this.registerForm.controls['prevWorkLink'].value !== null && {
        prevWorkLink: this.registerForm.controls['prevWorkLink'].value,
      }),
      photo: this.registerForm.controls['photo'].value,
    };

    console.log(formData);

    // connecting to the backend
    this._AuthUser.registerUser(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        // if (err.error.message === 'The email has already been taken.') {
        //   this.emailAlreadyTaken = true;
        // }
      },
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.patchValue({
        photo: file.name,
      });
    }
  }
}
