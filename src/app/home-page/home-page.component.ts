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
  filteredMovies: MovieOverview[] = [];
  filteredPersons: PersonOverview[] = [];
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
    if (this.listOfitems.trim() !== '') {
      this.searching = true;
    };
    if (this.listOfitems.trim() == '') {
      this.searching = false;
    }

    if (this.listOfitems.trim() === '') {
      this.filteredMovies = [];
      this.filteredPersons = [];
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.searchService.searchMovies(this.listOfitems).subscribe(
      (movies) => {
        this.filteredMovies = movies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
        this.isLoading = false;
      }
    );

    this.searchService.searchPersons(this.listOfitems).subscribe(
      (persons) => {
        this.filteredPersons = persons;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching persons. Please try again.';
        this.isLoading = false;
      }
    );
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
    return posterPath ? `${this.imageUrlBase}${posterPath}` : null;
  }

}
