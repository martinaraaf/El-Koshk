import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../services/auth-user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-portfolio',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-portfolio.component.html',
  styleUrl: './user-portfolio.component.css',
})
export class UserPortfolioComponent {

  isYTUrlSuccessful: boolean = false;
  user: any;
  userVideos: any;

  constructor(private _Router: Router, private _AuthUser: AuthUserService) {}

  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      this._AuthUser.getUserData(userToken).subscribe({
        next: (res) => {
          this.user = res.user;
          this.userVideos = res.videos;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        },
      });
    }
  }

  getVideoUrl(video_id: string): any {
    const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video_id}`
    );
    return videoUrl; // Assuming YouTube videos
  }

  addVideoform: FormGroup = new FormGroup({
    youtubeUrl: new FormControl('', Validators.required),
  });

  addVideo(addVideoform: FormGroup) {
    const formdata = new FormData();
    const link = this.addVideoform.get('youtubeUrl')?.value;

    formdata.append('link', this.addVideoform.get('youtubeUrl')?.value);
    const userToken = localStorage.getItem('userToken');
    console.log(userToken);
    console.log(link);

    this._AuthUser.addNewVideo(formdata, userToken).subscribe({
      next: (res) => {
        this.isYTUrlSuccessful = true;
      },
      error: (err) => {
        console.error('Error adding video:', err);
      },
      complete: () => {},
    });
  }
}
