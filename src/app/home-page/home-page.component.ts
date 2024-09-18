import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LatestVideosService } from '../services/latest-videos.service';
import { LatestVideos } from '../interface/latestVideos.model';

// interface for responsive options for the carousel
interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CarouselModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  latest: LatestVideos = [];
  responsiveOptions: ResponsiveOption[] = [];
  videoTitle: string = '';
  videoURL: SafeResourceUrl = '';

  @ViewChild('staticBackdrop') modal!: ElementRef;

  constructor(
    private latestService: LatestVideosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.latestService.getLatest().subscribe({
      next: (data: LatestVideos) => {
        this.latest = data;
      },
      error: (error) => {
        console.error('Failed to fetch latest videos:', error);
      },
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

  openVideoModal(video_id: string, video_title: string) {
    this.videoTitle = video_title;
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video_id
    );
  }
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
}
