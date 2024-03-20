import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home-latest-card',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home-latest-card.component.html',
  styleUrl: './home-latest-card.component.css',
})
export class HomeLatestCardComponent {}
