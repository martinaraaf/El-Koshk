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
  // userName: string = '';
  userName: string | null = null;

  constructor(private _AuthUser: AuthUserService) {}

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('userToken') ? true : false;
    this.userName = 'Ahmed';
    console.log(this.isLogged);

    // this.userName = this._AuthUser.getUserName();
    // this._AuthUser.userName$.subscribe((name) => {
    //   this.userName = name;
    //   // console.log(name);
    // });
  }

  logOut() {
    this._AuthUser.signOutUser();
  }
}
