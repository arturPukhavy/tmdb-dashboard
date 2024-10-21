import { Component, OnInit } from '@angular/core';
import { MovieOverview } from '../models/model-response/movie-overview.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SearchService } from './search-page.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, CommonModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit{
  searchQuery: string = '';
  filteredMovies: MovieOverview[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      // Perform your search based on this.searchQuery
    });
  }

  // Called whenever the user types in the search input
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredMovies = [];
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Call the service to fetch movies based on the search query
    this.searchService.searchMovies(this.searchQuery).subscribe(
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

  getImageUrl(posterPath: string) {
    return posterPath ? `${this.imageUrlBase}${posterPath}` : 'assets/default-poster.jpg';
  }

}
