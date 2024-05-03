import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLogged: boolean = false;
  userName: string = '';

  constructor(private _AuthUser: AuthUserService) {}

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('userToken') ? true : false;
    this.userName = this._AuthUser.getUserName();
  }

  logOut() {
    this._AuthUser.signOutUser();
  }
}
