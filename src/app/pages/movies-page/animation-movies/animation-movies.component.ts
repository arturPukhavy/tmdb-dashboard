import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MovieOverview } from '../../../core/models/model-response/movie-overview.model';
import { MoviesService } from '../../../core/services/movies.service';

@Component({
  selector: 'app-animation-movies',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './animation-movies.component.html',
  styleUrl: './animation-movies.component.css'
})
export class AnimationMoviesComponent implements OnInit{
  isLoading: boolean = false;
  errorMessage: string = '';
  movies: MovieOverview[] = [];
  currentMoviePage: number = 1;
  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAnimationMovies(this.currentMoviePage);
  }

  fetchAnimationMovies(page: number) {
    this.moviesService.getAnimationMovies(page).subscribe(
      (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
        this.isLoading = false;
      }
    )
  }

  onMoviePageChange(page: number) {
    this.currentMoviePage = page;
    this.fetchAnimationMovies(this.currentMoviePage);
  }

  get totalMoviePages(): number {
    return this.moviesService.totalMoviePages;
  }

  getImageUrl(posterPath: string) {
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  }

}
