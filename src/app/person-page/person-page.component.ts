import { Component } from '@angular/core';
import { Person } from '../models/person-model/person.model';
import { PersonService } from './person.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-page',
  standalone: true,
  imports: [],
  templateUrl: './person-page.component.html',
  styleUrl: './person-page.component.css'
})
export class PersonPageComponent {
  person: Person | null = null;
  errorMessage: string = '';
  id: number;

  constructor(private personService: PersonService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.onFetchPerson();
    });
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

  getImageUrl(posterPath: string | null) {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
  }

}
