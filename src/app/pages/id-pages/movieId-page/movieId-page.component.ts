import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../../core/services/film.service';
import { Movie } from '../../../core/models/movie-model/movie.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersonOverview } from '../../../core/models/model-response/person-overview.model';
import { MovieImages } from '../../../core/models/movie-model/movie.images.model';

@Component({
  selector: 'app-film-page',
  standalone: true,
  imports: [NgFor, RouterModule, FormsModule, NgIf, CommonModule],
  templateUrl: './movieId-page.component.html',
  styleUrl: './movieId-page.component.css'
})
export class MovieIdPageComponent implements OnInit {
  movie: Movie | null = null;
  movieActors: PersonOverview[] = [];
  images: MovieImages[] = [];
  errorMessage: string = '';
  id: number;
  currentIndex: number = 0;
  isModalOpen = false;
  selectedImage: string | null = null;

  constructor(private filmService: FilmService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.onFetchMovie();
      this.onFetchImages();
      this.onFetchActors();
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

  onFetchImages() {
    this.filmService.fetchImages(this.id).subscribe(
      (photos) => {
        this.images = photos.backdrops;
      },
      (error) => {
        console.error('Error fetching images:', error);
        this.errorMessage = 'Error fetching images. Please try again.';
      }
    );
  }

  openModal(imageUrl: string, index: number) {
    this.selectedImage = imageUrl;
    this.currentIndex = index;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedImage = null;
  }

  prevPhoto() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedImage = this.getImageUrl(this.images[this.currentIndex].file_path);
    }
  }

  nextPhoto() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.selectedImage = this.getImageUrl(this.images[this.currentIndex].file_path);
    }
  }

  onFetchActors() {
    this.filmService.fetchActors(this.id).subscribe(
      (actor) => {
        this.movieActors = actor.cast;
      },
      (error) => {
        console.error('Error fetching actors:', error);
        this.errorMessage = 'Error fetching actors. Please try again.';
      }
    );
  }

  getImageUrl(posterPath: string | null) {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  }

  getGenresAsString(): string {
    return this.movie?.genres.map(genre => genre.name).join(', ') || 'N/A';
  }
}
