import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LandingImageComponent } from '../landing-image/landing-image.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeLatestCardComponent } from '../home-latest-card/home-latest-card.component';
import { CarouselModule } from 'primeng/carousel';
import { LatestVideosService } from '../services/latest-videos.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Latest } from '../interface/latest';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  videoURL: any;
  videoId: string | undefined;

  constructor(
    private _latestService: LatestVideosService,
    private sanitizer: DomSanitizer
  ) {}

  @ViewChild('staticBackdrop') modal!: ElementRef;

  ngOnInit() {
    this._latestService.getLatest().subscribe((res) => {
      this.latest = res;
      // console.log(res);
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

  openVideoModal(videoId: string): void {
    this.videoId = videoId;
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  // pauseVideo() {
  //   const iframe = this.modal.nativeElement.querySelector('iframe');
  //   const player = new URL(iframe.src).searchParams.get('v');

  //   // Pause the video by removing the src attribute
  //   iframe.src = '';
  // }
}
