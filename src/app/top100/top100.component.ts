import { Component, OnInit } from '@angular/core';
import { top100Service } from './top100.service';
import { MovieOverview } from '../models/model-response/movie-overview.model';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-top100',
  standalone: true,
  imports: [RouterModule, CommonModule, NgFor],
  templateUrl: './top100.component.html',
  styleUrl: './top100.component.css'
})
export class Top100Component implements OnInit {
  topMovies: string = '';
  topFilms: MovieOverview[] = [];
  errorMessage: string = '';

  constructor(private top100Service: top100Service) {}

  ngOnInit(): void {
    this.fetchTopMovies();
  }

  fetchTopMovies() {
    this.top100Service.getTopMovies().subscribe(
      (movies) => {
        this.topFilms = movies;
      },
      (error) => {
        this.errorMessage = 'Error fetching movies. Please try again.';
      }
    )
  }

  getImageUrl(posterPath: string | null) {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
  }

  getSizeClass(index: number) {
    if (index < 4) {
      return 'size-large';
    } else if (index < 16) {
      return 'size-medium'; 
    } else {
      return 'size-small'; 
    }
  }

}
