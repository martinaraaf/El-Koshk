import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, title: 'EL KOSHK' },
  { path: 'portfolios', component: PortfoliosComponent, title: 'EL KOSHK' },
  { path: 'aboutus', component: AboutUsComponent, title: 'EL KOSHK' },
  { path: 'contactus', component: ContactUsComponent, title: 'EL KOSHK' },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' },
];
