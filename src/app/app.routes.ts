import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserPortfolioComponent } from './user-portfolio/user-portfolio.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { AllVideosComponent } from './admin/all-videos/all-videos.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, title: 'EL KOSHK' },
  { path: 'portfolios', component: PortfoliosComponent, title: 'EL KOSHK' },
  { path: 'aboutus', component: AboutUsComponent, title: 'EL KOSHK' },
  { path: 'contactus', component: ContactUsComponent, title: 'EL KOSHK' },
  { path: 'joinus', component: RegisterPageComponent, title: 'EL KOSHK' },
  { path: 'login', component: LoginPageComponent, title: 'EL KOSHK' },
  { path: 'myportfolio', component: UserPortfolioComponent, title: 'EL KOSHK' },
  {
    path: 'admin',
    component: AdminLoginComponent,
    title: 'Admin Login',
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    title: 'Admin Dashboard',
  },
  {
    path: 'admin/dashboard/users',
    component: UsersComponent,
    canActivate: [adminGuard],
    title: 'users',
  },
  {
    path: 'admin/dashboard/videos',
    component: AllVideosComponent,
    canActivate: [adminGuard],
    title: 'videos',
  },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' },
];
