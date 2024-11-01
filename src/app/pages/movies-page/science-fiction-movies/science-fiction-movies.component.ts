import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MovieOverview } from '../../../core/models/model-response/movie-overview.model';
import { MoviesService } from '../../../core/services/movies.service';

@Component({
  selector: 'app-science-fiction-movies',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './science-fiction-movies.component.html',
  styleUrl: './science-fiction-movies.component.css'
})
export class ScienceFictionMoviesComponent implements OnInit{
  isLoading: boolean = false;
  errorMessage: string = '';
  movies: MovieOverview[] = [];
  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchScienceFictionMovies();
  }

  fetchScienceFictionMovies() {
    this.moviesService.getScienceFictionMovies().subscribe(
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

  getImageUrl(posterPath: string) {
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  }

}
