import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { Top100Component } from './top100/top100.component';
import { PersonPageComponent } from './person-page/person-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomePageComponent},
    {path: 'film/:id', component: FilmPageComponent},
    {path: 'person/:id', component: PersonPageComponent},
    {path: 'top100', component: Top100Component}
];

