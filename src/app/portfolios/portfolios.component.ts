import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-portfolios',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './portfolios.component.html',
  styleUrl: './portfolios.component.css',
})
export class PortfoliosComponent {
  students: any[] = [
    {
      id: 1,
      name: 'چونير چورج',
      title: 'صانع محتوى',
      age: 15,
      photo: '../../assets/images/PORTFOLIOS/CARD1/student1_photo.png',
      background_image: '../../assets/images/PORTFOLIOS/CARD1/Layer-4.png',
    },
    {
      id: 2,
      name: 'فلانة الفلانى',
      title: 'صانع محتوى',
      age: 13,
      photo: '../../assets/images/PORTFOLIOS/CARD1/student1_photo.png',
      background_image: '../../assets/images/PORTFOLIOS/CARD1/Layer-4.png',
    },
    {
      id: 3,
      name: 'فلانة الفلانى',
      title: 'مقدم برامج',
      age: 11,
      photo: '../../assets/images/PORTFOLIOS/CARD1/student1_photo.png',
      background_image: '../../assets/images/PORTFOLIOS/CARD1/Layer-4.png',
    },
    {
      id: 4,
      name: 'فلانة الفلانى',
      title: 'مقدمة برامج',
      age: 16,
      photo: '../../assets/images/PORTFOLIOS/CARD1/student1_photo.png',
      background_image: '../../assets/images/PORTFOLIOS/CARD1/Layer-4.png',
    },
    {
      id: 5,
      name: 'فلانة الفلانى',
      title: 'مقدمة برامج',
      age: 12,
      photo: '../../assets/images/PORTFOLIOS/CARD1/student1_photo.png',
      background_image: '../../assets/images/PORTFOLIOS/CARD1/Layer-4.png',
    },
    {
      id: 6,
      name: 'فلانة الفلانى',
      title: 'مقدمة برامج',
      age: 8,
      photo: '../../assets/images/PORTFOLIOS/CARD1/student1_photo.png',
      background_image: '../../assets/images/PORTFOLIOS/CARD1/Layer-4.png',
    },
  ];
}
