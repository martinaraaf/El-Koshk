import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../services/auth-user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserInfo, UserPortfolioResponse, UserVideos } from '../interface/user';
import { Video } from '../interface/latestVideos.model';

@Component({
  selector: 'app-user-portfolio',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './user-portfolio.component.html',
  styleUrl: './user-portfolio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPortfolioComponent implements OnInit {
  user: UserInfo = {
    id: 0,
    name: '',
    email: '',
    type: '',
    phone_number: 0,
  };
  userVideos!: UserVideos[];
  loading: boolean = true;
  // youtubeUrl: string = '';
  userToken: string | null;
  // isYTUrlSuccessful: boolean = false;

  constructor(
    private _Router: Router,
    private _AuthUser: AuthUserService,
    private sanitizer: DomSanitizer
  ) {
    this.userToken = localStorage.getItem('userToken');
  }

  ngOnInit(): void {
    if (this.userToken) {
      this._AuthUser.getUserData(this.userToken).subscribe({
        next: (data: UserPortfolioResponse) => {
          this.user = data.user;
          this.userVideos = data.videos;
          this.loading = false;
          console.log(this.user);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          this.loading = false;
        },
      });
    } else {
      this._Router.navigate(['/login']);
    }
    this.loading = false;
  }

  getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // getVideoUrl(video_id: string): any {
  //   const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `https://www.youtube.com/embed/${video_id}`
  //   );
  //   return videoUrl; // Assuming YouTube videos
  // }
  // trackByVideoId(index: number, video: Video): number {
  //   return video.id;
  // }

  // addVideoform: FormGroup = new FormGroup({
  //   youtubeUrl: new FormControl('', Validators.required),
  // });
  addVideo(form: NgForm) {
    if (form.valid) {
      this._AuthUser.addNewVideo(form.value, this.userToken).subscribe({
        next: (res) => {
          // this.isYTUrlSuccessful = true;
          console.log('added');
        },
        error: (err) => {
          console.error('Error adding video:', err);
        },
      });
    }
  }
}
