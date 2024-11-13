import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MoviesService } from '../../../core/services/movies.service';
import { MovieOverview } from '../../../core/models/model-response/movie-overview.model';

@Component({
  selector: 'app-action-movies',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './action-movies.component.html',
  styleUrl: './action-movies.component.css'
})
export class ActionMoviesComponent implements OnInit{
  errorMessage: string = '';
  movies: MovieOverview[] = [];
  currentMoviePage: number = 1;
  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchActionMovies(this.currentMoviePage);
  }

  fetchActionMovies(page: number) {
    this.moviesService.getActionMovies(page).subscribe(
      (movies) => {
        this.movies = movies
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
      }
    );
  }

  onMoviePageChange(page: number) {
    this.currentMoviePage = page;
    this.fetchActionMovies(this.currentMoviePage);
  }

  get totalMoviePages(): number {
    return this.moviesService.totalMoviePages;
  }

  getImageUrl(posterPath: string) {
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  }

}
