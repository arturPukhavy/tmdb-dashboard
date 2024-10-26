import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieOverview } from '../models/model-response/movie-overview.model';
import { SearchService } from './search.service';
import { MoviesService } from './movies.service';
import { PersonOverview } from '../models/model-response/person-overview.model';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  listOfitems: string = '';
  searching = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  filteredMovies: MovieOverview[] = [];
  filteredPersons: PersonOverview[] = [];

  totalMovies: number = 0;
  totalPersons: number = 0;
  
  totalMoviePages: number = 0;
  totalPersonPages: number = 0;
  
  currentMoviePage: number = 1;
  currentPersonPage: number = 1;

  newMovies: MovieOverview[] = [];
  trendingMovies: MovieOverview[] = [];
  upcomingMovies: MovieOverview[] = [];

  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private searchService: SearchService, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.fetchNewMovies();
    this.fetchTrandingMovies();
    this.fetchUpcomingMovies();
  }

  onSearchInput() {
    if (this.listOfitems.trim() !== '') {
      this.searching = true;
      this.currentMoviePage = 1; // Reset to first page on new search
      this.currentPersonPage = 1;
      this.onSearchMovies();
      this.onSearchPersons();
    } else {
        this.filteredMovies = [];
        this.filteredPersons = [];
        this.searching = false;
      }
  }

  onSearchMovies() {
    this.isLoading = true;
    this.searchService.searchMovies(this.listOfitems, this.currentMoviePage).subscribe(
      (response) => {
        this.filteredMovies = response.results as MovieOverview[];
        this.totalMovies = response.total_results;
        this.totalMoviePages = response.total_pages;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
        this.isLoading = false;
      }
    );
  }

  onSearchPersons() {
    this.isLoading = true;
    this.searchService.searchPersons(this.listOfitems, this.currentPersonPage).subscribe(
      (response) => {
        this.filteredPersons = response.results as PersonOverview[];
        this.totalPersons = response.total_results;
        this.totalPersonPages = response.total_pages;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching persons. Please try again.';
        this.isLoading = false;
      }
    );
  }

  onMoviePageChange(page: number) {
    this.currentMoviePage = page;
    this.onSearchMovies();
  }

  onPersonPageChange(page: number) {
    this.currentPersonPage = page;
    this.onSearchPersons();
  }

  fetchNewMovies() {
    this.moviesService.getNewMovies(this.listOfitems).subscribe(
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
    this.moviesService.getTrendingMovies(this.listOfitems).subscribe(
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
    this.moviesService.getUpcomingMovies(this.listOfitems).subscribe(
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
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'https://i.pinimg.com/originals/1f/1c/aa/1f1caa7f017f5b41a7b047309fa75bba.jpg';
  }

}
