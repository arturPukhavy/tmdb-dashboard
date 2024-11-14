import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Person } from "../models/person-model/person.model";
import { map, Observable } from "rxjs";
import { Movie } from "../models/movie-model/movie.model";

@Injectable({
    providedIn: 'root'
  })
  export class GamesService {
    private apiUrlPerson = '/3/trending/person/week?language=en-US';
    private apiUrlMovie = '/3/movie/top_rated';
  
    constructor(private http: HttpClient) {}
  
    getRandomPerson(): Observable<Person> {
        return this.http.get<{ results: Person[] }>(`${this.apiUrlPerson}`).pipe(
          map(response => {
            // Filter out actors based on popularity 
            const filteredActors = response.results.filter(actor => 
              actor.popularity >= 10
            );
    
            // Pick a random actor from the filtered list
            const randomIndex = Math.floor(Math.random() * filteredActors.length);
            return filteredActors[randomIndex];
          })
        );
      }

      getRandomMovie(): Observable<Movie> {
        return this.http.get<{ results: Movie[] }>(`${this.apiUrlMovie}`).pipe(
          map(response => {
            // Filter out actors based on popularity 
            const filteredMovies = response.results.filter(movie => 
              movie.popularity >= 10
            );
    
            // Pick a random actor from the filtered list
            const randomIndex = Math.floor(Math.random() * filteredMovies.length);
            return filteredMovies[randomIndex];
          })
        );
      }
  }