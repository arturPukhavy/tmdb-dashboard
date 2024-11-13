import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Top100Component } from './pages/top100/top100.component';
import { PersonIdPageComponent } from './pages/id-pages/personId-page/personId-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MovieIdPageComponent } from './pages/id-pages/movieId-page/movieId-page.component';
import { NewMoviesComponent } from './pages/movies-page/new-movies/new-movies.component';
import { UpcomingMoviesComponent } from './pages/movies-page/upcoming-movies/upcoming-movies.component';
import { PopularMoviesComponent } from './pages/movies-page/popular-movies/popular-movies.component';
import { HorrorMoviesComponent } from './pages/movies-page/horror-movies/horror-movies.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { ComedyMoviesComponent } from './pages/movies-page/comedy-movies/comedy-movies.component';
import { AnimationMoviesComponent } from './pages/movies-page/animation-movies/animation-movies.component';
import { ActionMoviesComponent } from './pages/movies-page/action-movies/action-movies.component';
import { FantasyMoviesComponent } from './pages/movies-page/fantasy-movies/fantasy-movies.component';
import { ScienceFictionMoviesComponent } from './pages/movies-page/science-fiction-movies/science-fiction-movies.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { ActorGameComponent } from './pages/games-page/actor-game/actor-game.component';
import { MovieGameComponent } from './pages/games-page/movie-game/movie-game.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomePageComponent},

    {path: 'search/:result', component: SearchPageComponent},

    {path: 'movies', component: MoviesPageComponent},    
    {path: 'new', component: NewMoviesComponent},
    {path: 'upcoming', component: UpcomingMoviesComponent},
    {path: 'popular', component: PopularMoviesComponent},
    {path: 'horror', component: HorrorMoviesComponent},
    {path: 'comedy', component: ComedyMoviesComponent},
    {path: 'animation', component: AnimationMoviesComponent},
    {path: 'action', component: ActionMoviesComponent},
    {path: 'fantasy', component: FantasyMoviesComponent},
    {path: 'science-fiction', component: ScienceFictionMoviesComponent},  

    {path: 'top100', component: Top100Component},

    {path: 'games', component: GamesPageComponent},
    {path: 'actorgame', component: ActorGameComponent},
    {path: 'moviegame', component: MovieGameComponent},

    {path: 'film/:id', component: MovieIdPageComponent},
    {path: 'person/:id', component: PersonIdPageComponent},
];

