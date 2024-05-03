import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  isLogged: boolean = false;

  constructor(private _AuthUser: AuthUserService) {}

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('userToken') ? true : false;
  }
}
