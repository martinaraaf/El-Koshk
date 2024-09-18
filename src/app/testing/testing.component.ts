import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { LatestVideosService } from '../services/latest-videos.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LatestVideos } from '../interface/latestVideos.model';
import { UserPortfolioResponse, UserVideos } from '../interface/user';
import { AuthUserService } from '../services/auth-user.service';
import { Router } from '@angular/router';

interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CarouselModule, ButtonModule, CommonModule],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css',
})
export class TestingComponent implements OnInit {
  userVideos!: UserVideos[];
  userToken: string | null;

  constructor(private _Router: Router, private _AuthUser: AuthUserService) {
    this.userToken = localStorage.getItem('userToken');
  }
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    // const userToken = localStorage.getItem('userToken');

    if (this.userToken) {
      this._AuthUser.getUserData(this.userToken).subscribe({
        next: (data: UserPortfolioResponse) => {
          this.userVideos = data.videos;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        },
      });
    } else {
      this._Router.navigate(['/login']);
    }
  }

  getVideoUrl(video_id: string): any {
    const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video_id}`
    );
    return videoUrl; // Assuming YouTube videos
  }
}

// ngOnInit(): void {
//   // form/inputs validation
//   this.registerForm = new FormGroup(
//     {
//       first_name: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(3),
//         Validators.maxLength(32),
//       ]),
//       last_name: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(3),
//         Validators.maxLength(32),
//       ]),
//       email: new FormControl(null, [Validators.required, Validators.email]),
//       password: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
//       ]),
//       confirmPassword: new FormControl(null, [Validators.required]),
//       type: new FormControl('student'),
//       profilePic: new FormControl(null, Validators.required),
//       phoneNumber: new FormControl(null, [
//         Validators.required,
//         Validators.pattern(/^01[0125][0-9]{8}$/),
//       ]),
//       reachMethod: new FormControl(''),
//       name: new FormControl(''),
//       age: new FormControl(''),
//       talent: new FormControl(''),
//       artisticExperience: new FormControl(''),
//       prevWorkLink: new FormControl(''),
//       address: new FormControl(''),
//       parentNumber: new FormControl(''),
//       mobileNumber: new FormControl(''),
//     },
//     { validators: this.passwordMatchValidator }
//   );
// }
// onchange() {
//   console.log(this.registerForm.value.reachMethod);
// }
// onRegister() {
//   this.isLoading = true;
//   this.emailAlreadyTaken = false;

//   // to be deleted later
//   // const firstName = this.registerForm.controls['first_name'].value;
//   // const lastName = this.registerForm.controls['last_name'].value;
//   // const fullName = `${firstName} ${lastName}`;

//   // formData.append('name', fullName);
//   // formData.append('email', this.registerForm.controls['email'].value);
//   // formData.append('password', this.registerForm.controls['password'].value);
//   // formData.append('type', this.registerForm.controls['type'].value);
//   // for profile pic
//   // formdata.append(
//   //   'profilePic',MoivesApp

//   //   this.registerForm.controls['profilePic'].value
//   // );
//   // formData.append(
//   //   'phone_number',
//   //   this.registerForm.controls['phoneNumber'].value
//   // );

//   // creating the form object for backend
//   const formData: RegisterFormData = {
//     name: `${this.registerForm.controls['first_name'].value} ${this.registerForm.controls['last_name'].value}`,
//     email: this.registerForm.controls['email'].value,
//     password: this.registerForm.controls['password'].value,
//     type: this.registerForm.controls['type'].value,
//     phone_number: this.registerForm.controls['phoneNumber'].value,
//   };

//   // connecting to the backend
//   this._AuthUser.registerUser(formData).subscribe({
//     next: () => {
//       this.isLoading = false;
//       this._Router.navigate(['/login']);
//     },
//     error: (err) => {
//       this.isLoading = false;
//       if (err.error.message === 'The email has already been taken.') {
//         this.emailAlreadyTaken = true;
//       }
//     },
//   });
// }

// // handling the file (profilepic) continue later
// onFileChange(event: Event) {
//   const inputElement = event.target as HTMLInputElement;
//   if (inputElement.files && inputElement.files.length > 0) {
//     const file = inputElement.files[0];
//     // Do something with the selected file, such as uploading it to a server or processing it
//     this.profilePhoto = file;
//     // console.log('Selected file:', file);
//     // if (file.type.startsWith('image/')) {
//     //   this.registerForm.patchValue({
//     //     profilePic: file,
//     //   });
//     //   this.profilePic = file;
//     // } else {
//     //   // Optionally handle the case where the selected file is not an image
//     //   console.error('The selected file is not an image.');
//     // }
//   }
// }

// // custom validation for confirm password
// passwordMatchValidator: ValidatorFn = (
//   control: AbstractControl
// ): ValidationErrors | null => {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');

//   return password &&
//     confirmPassword &&
//     password.value !== confirmPassword.value
//     ? { passwordsDoNotMatch: true }
//     : null;
// };

// google map
// AIzaSyCoB2teV1OZAX37LOhPRdTuZOM7duc8py4  my key
//  AIzaSyCuTilAfnGfkZtIx0T3qf-eOmWZ_N2LpoY free from linked in
// to be put in the index.html


// center: google.maps.LatLngLiteral = { lat: 30.06914, lng: 31.31269 };
// zoom = 15;
// options: google.maps.MapOptions = {
//   disableDefaultUI: false,
//   mapTypeControl: false,
//   fullscreenControl: true,
//   streetViewControl: true,
// };

// <div class="map-wrapper py-5">
//   <google-map
//     height="550"
//     width="100%"
//     [center]="center"
//     [zoom]="zoom"
//     [options]="options"
//     class="container-fluid d-flex justify-content-center align-items-center"
//   >
//     <map-marker [position]="center"></map-marker>
//   </google-map>
// </div>
// <div></div>
