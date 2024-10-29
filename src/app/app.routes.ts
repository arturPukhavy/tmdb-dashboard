import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FilmPageComponent } from './pages/film-page/film-page.component';
import { Top100Component } from './pages/top100/top100.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomePageComponent},
    {path: 'film/:id', component: FilmPageComponent},
    {path: 'person/:id', component: PersonPageComponent},
    {path: 'top100', component: Top100Component},
    {path: 'search/:result', component: SearchPageComponent}
];

