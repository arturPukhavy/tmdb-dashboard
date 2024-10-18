import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FilmPageComponent } from './film-page/film-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomePageComponent},
    {path: 'film', component: FilmPageComponent}
];
