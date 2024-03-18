import { Component } from '@angular/core';
import { LandingImageComponent } from '../landing-image/landing-image.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LandingImageComponent,HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
