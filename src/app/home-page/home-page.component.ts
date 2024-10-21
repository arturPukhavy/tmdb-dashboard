import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MovieOverview } from '../models/model-response/movie-overview.model';
import { SearchService } from './search.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  searchQuery: string = '';
  searching = false;
  filteredMovies: MovieOverview[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private searchService: SearchService, private router: Router) {}

  onSearchInput() {
    if (this.searchQuery.trim() !== '') {
      this.searching = true;
    };
    if (this.searchQuery.trim() == '') {
      this.searching = false;
    }

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
