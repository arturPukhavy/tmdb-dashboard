import { Component } from '@angular/core';
import { Person } from '../models/person-model/person.model';
import { PersonService } from './person.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MovieOverview } from '../models/model-response/movie-overview.model';

@Component({
  selector: 'app-person-page',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, CommonModule],
  templateUrl: './person-page.component.html',
  styleUrl: './person-page.component.css'
})
export class PersonPageComponent {
  person: Person | null = null;
  actorMovies: MovieOverview[] = [];
  errorMessage: string = '';
  id: number;
  isBiographyExpanded = false;

  constructor(private personService: PersonService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.onFetchPerson();
      this.onFetchPersonMovies();
    });
  }

  toggleBiography() {
    this.isBiographyExpanded = !this.isBiographyExpanded;
  }
  shouldShowToggle(person: any): boolean {
    // Ensure 'Show More' is only displayed if the biography is longer than 1000 characters
    return person?.biography && person.biography.length > 1000;
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

  getImageUrl(posterPath: string | null) {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://i.pinimg.com/originals/1f/1c/aa/1f1caa7f017f5b41a7b047309fa75bba.jpg';
  }

}
