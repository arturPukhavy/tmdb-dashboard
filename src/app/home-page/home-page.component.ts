import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MovieOverview } from '../models/model-response/movie-overview.model';
import { SearchService } from './search.service';
import { MoviesService } from './movies.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  listOfMovies: string = '';
  searching = false;
  filteredMovies: MovieOverview[] = [];
  newMovies: MovieOverview[] = [];
  trendingMovies: MovieOverview[] = [];
  upcomingMovies: MovieOverview[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private searchService: SearchService, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.fetchNewMovies();
    this.fetchTrandingMovies();
    this.fetchUpcomingMovies();
  }

  onSearchInput() {
    if (this.listOfMovies.trim() !== '') {
      this.searching = true;
    };
    if (this.listOfMovies.trim() == '') {
      this.searching = false;
    }

    if (this.listOfMovies.trim() === '') {
      this.filteredMovies = [];
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Call the service to fetch movies based on the search query
    this.searchService.searchMovies(this.listOfMovies).subscribe(
      (movies) => {
        this.filteredMovies = movies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
        this.isLoading = false;
      }
    );
  }

  fetchNewMovies() {
    this.moviesService.getNewMovies(this.listOfMovies).subscribe(
      (movies) => {
        this.newMovies = movies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
        this.isLoading = false;
      }
    )
  }

  fetchTrandingMovies() {
    this.moviesService.getTrendingMovies(this.listOfMovies).subscribe(
      (movies) => {
        this.trendingMovies = movies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
        this.isLoading = false;
      }
    )
  }

  fetchUpcomingMovies() {
    this.moviesService.getUpcomingMovies(this.listOfMovies).subscribe(
      (movies) => {
        this.upcomingMovies = movies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
        this.isLoading = false;
      }
    )
  }

  getImageUrl(posterPath: string) {
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'assets/default-poster.jpg';
  }

}
