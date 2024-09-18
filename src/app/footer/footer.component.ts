import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  isLogged: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('userToken') ? true : false;
  }
}
