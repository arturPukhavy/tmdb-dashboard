import { Component, OnInit } from '@angular/core';
import { FilmService } from './film.service';
import { Movie } from '../models/movie-model/movie.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-film-page',
  standalone: true,
  imports: [NgFor, RouterModule, FormsModule, NgIf, CommonModule],
  templateUrl: './film-page.component.html',
  styleUrl: './film-page.component.css'
})
export class FilmPageComponent implements OnInit {
  movie: Movie | null = null;
  errorMessage: string = '';
  id: number;

  constructor(private filmService: FilmService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.onFetchMovie();
    });
  }

  onFetchMovie() {
    this.filmService.fetchMovie(this.id).subscribe(
      (film) => {
        this.movie = film;
      },
      (error) => {
        console.error('Error fetching movie:', error);
        this.errorMessage = 'Error fetching movies. Please try again.';
      }
    );
  }

  getImageUrl(posterPath: string | null) {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
  }

  getGenresAsString(): string {
    return this.movie?.genres.map(genre => genre.name).join(', ') || 'N/A';
  }
}
