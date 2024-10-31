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
  listOfitems: string = '';
  movies: MovieOverview[] = [];
  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchActionMovies();
  }

  fetchActionMovies() {
    this.moviesService.getActionMovies(this.listOfitems).subscribe(
      (movies) => {
        this.movies = movies.sort((a: any, b: any) => b.vote_average - a.vote_average);
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
      }
    )
  }

  getImageUrl(posterPath: string) {
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  }

}
