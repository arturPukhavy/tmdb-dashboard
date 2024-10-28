import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchService } from './search.service';
import { MovieOverview } from '../models/model-response/movie-overview.model';
import { PersonOverview } from '../models/model-response/person-overview.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit, OnDestroy{
  listOfitems: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  paramsSubscription : Subscription;

  filteredMovies: MovieOverview[] = [];
  filteredPersons: PersonOverview[] = [];

  totalMovies: number = 0;
  totalPersons: number = 0;
  
  totalMoviePages: number = 0;
  totalPersonPages: number = 0;
  
  currentMoviePage: number = 1;
  currentPersonPage: number = 1;

  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.listOfitems = params.get('result') || ''; // Get the search term from parameters
    });
    this.onSearchMovies();
    this.onSearchPersons();
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

  getImageUrl(posterPath: string) {
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
