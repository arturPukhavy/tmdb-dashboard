import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Top100Component } from './pages/movies-pages/top100/top100.component';
import { PersonIdPageComponent } from './pages/id-pages/personId-page/personId-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MovieIdPageComponent } from './pages/id-pages/movieId-page/movieId-page.component';
import { NewMoviesComponent } from './pages/movies-pages/new-movies/new-movies.component';
import { UpcomingMoviesComponent } from './pages/movies-pages/upcoming-movies/upcoming-movies.component';
import { PopularMoviesComponent } from './pages/movies-pages/popular-movies/popular-movies.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomePageComponent},
    {path: 'film/:id', component: MovieIdPageComponent},
    {path: 'person/:id', component: PersonIdPageComponent},
    {path: 'top100', component: Top100Component},
    {path: 'search/:result', component: SearchPageComponent},
    {path: 'new', component: NewMoviesComponent},
    {path: 'upcoming', component: UpcomingMoviesComponent},
    {path: 'popular', component: PopularMoviesComponent}
];

