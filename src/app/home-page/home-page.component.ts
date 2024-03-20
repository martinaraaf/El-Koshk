import { Component } from '@angular/core';
import { LandingImageComponent } from '../landing-image/landing-image.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeLatestCardComponent } from '../home-latest-card/home-latest-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    LandingImageComponent,
    HeaderComponent,
    FooterComponent,
    HomeLatestCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
}
