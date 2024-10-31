import { Component } from '@angular/core';
import { Person } from '../../../core/models/person-model/person.model';
import { PersonService } from '../../../core/services/person.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MovieOverview } from '../../../core/models/model-response/movie-overview.model';
import { PersonImages } from '../../../core/models/person-model/person.images.model';

@Component({
  selector: 'app-person-page',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, CommonModule],
  templateUrl: './personId-page.component.html',
  styleUrl: './personId-page.component.css'
})
export class PersonIdPageComponent {
  person: Person | null = null;
  actorMovies: MovieOverview[] = [];
  images: PersonImages[] = [];

  errorMessage: string = '';
  id: number;
  currentIndex: number = 0;
  isExpanded = false;
  isModalOpen = false;
  selectedImage: string | null = null;

  displayedCount: number = 7; // Number of images to display initially
  increment: number = 7; // Number of images to add when "Show More" is clicked

  constructor(private personService: PersonService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.onFetchPerson();
      this.onFetchPersonImages();
      this.onFetchPersonMovies();
    });
  }

  toggleBiography() {
    this.isExpanded = !this.isExpanded;
  }
  shouldShowToggle(person: any): boolean {
    // Ensure 'Show More' is only displayed if the biography is longer than 1000 characters
    return person?.biography && person.biography.length > 1000;
  }

  showMore() {
    this.displayedCount += this.increment;
  }
  showLess() {
    this.displayedCount = Math.max(7, this.displayedCount - this.increment); // Ensure at least 7 images are shown
  }

  onFetchPerson() {
    this.personService.fetchPerson(this.id).subscribe(
      (actor) => {
        this.person = actor;
      },
      (error) => {
        console.error('Error fetching person:', error);
        this.errorMessage = 'Error fetching person. Please try again.';
      }
    );
  }

  onFetchPersonImages() {
    this.personService.fetchPersonImages(this.id).subscribe(
      (photos) => {
        this.images = photos.profiles;
      },
      (error) => {
        console.error('Error fetching images:', error);
        this.errorMessage = 'Error fetching images. Please try again.';
      }
    );
  }

  onFetchPersonMovies() {
    this.personService.fetchPersonMovie(this.id).subscribe(
      (movies) => {
        this.actorMovies = movies.cast.sort((a: any, b: any) => {
          const dateA = new Date(a.release_date).getTime();
          const dateB = new Date(b.release_date).getTime();
          return dateB - dateA; // Sort descending (newest to oldest)
        });
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.errorMessage = 'Error fetching movies. Please try again.';
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

  getImageUrl(posterPath: string | null) {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';
  }

}
