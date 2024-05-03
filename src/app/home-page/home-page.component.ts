import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { LandingImageComponent } from '../landing-image/landing-image.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeLatestCardComponent } from '../home-latest-card/home-latest-card.component';
import { CarouselModule } from 'primeng/carousel';
import { LatestVideosService } from '../services/latest-videos.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    LandingImageComponent,
    HeaderComponent,
    FooterComponent,
    HomeLatestCardComponent,
    CarouselModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  latest!: any[];
  responsiveOptions: any[] | undefined;
  videoId: string | undefined;
  videoTitle: any;
  videoURL: any;

  constructor(private _latestService: LatestVideosService) {}
  private sanitizer = inject(DomSanitizer);

  @ViewChild('staticBackdrop') modal!: ElementRef;
  ngAfterViewInit() {
    // Subscribe to the hidden.bs.modal event when the modal is fully closed
    this.modal.nativeElement.addEventListener(
      'hidden.bs.modal',
      this.onModalClosed.bind(this)
    );
  }
  onModalClosed() {
    // Function to stop the video playback
    const iframe = this.modal.nativeElement.querySelector('iframe');
    iframe.src = '';
  }

  ngOnInit() {
    this._latestService.getLatest().subscribe((res) => {
      this.latest = res;
      // console.log(res)
      // console.log(res[0].snippet.thumbnails.maxres.url);
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  openVideoModal(videoId: string, videoTitle: string): void {
    this.videoId = videoId;
    this.videoTitle = videoTitle;
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
}
