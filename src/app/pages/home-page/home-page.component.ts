import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MovieOverview } from '../../core/models/model-response/movie-overview.model';
import { HomeService } from '../../core/services/home.service';
import { PersonOverview } from '../../core/models/model-response/person-overview.model';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  listOfitems: string = '';

  newMovies: MovieOverview[] = [];
  trendingMovies: MovieOverview[] = [];
  trendingPeople: PersonOverview[] = [];
  upcomingMovies: MovieOverview[] = [];
  popularMovies: MovieOverview[] = [];

  private imageUrlBase: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchNewMovies();
    this.fetchTrandingMovies();
    this.fetchUpcomingMovies();
    this.fetchPopularMovies();
    this.fetchTrandingPeople();
  }

  fetchNewMovies() {
    this.homeService.getNewMovies(this.listOfitems).subscribe(
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
    this.homeService.getTrendingMovies(this.listOfitems).subscribe(
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

  fetchTrandingPeople() {
    this.homeService.getTrendingPeople(this.listOfitems).subscribe(
      (person) => {
        this.trendingPeople = person;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching people. Please try again.';
        this.isLoading = false;
      }
    )
  }

  fetchUpcomingMovies() {
    this.homeService.getUpcomingMovies(this.listOfitems).subscribe(
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

  fetchPopularMovies() {
    this.homeService.getPopularMovies(this.listOfitems).subscribe(
      (movies) => {
        this.popularMovies = movies;
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
