import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Person } from "../models/person-model/person.model";
import { forkJoin, map, Observable } from "rxjs";
import { Movie } from "../models/movie-model/movie.model";

@Injectable({
    providedIn: 'root'
  })
  export class GamesService {
    private apiUrlPerson = '/3/trending/person/week';
    private apiUrlMovie = '/3/movie/top_rated';
  
    constructor(private http: HttpClient) {}
  
    getRandomPerson(): Observable<Person> {
      const requests = [];
      const totalPages = 30; 
  
      // Loop through pages 1 to `totalPages` and add the requests
      for (let page = 1; page <= totalPages; page++) {
        requests.push(
          this.http.get<{ results: Person[] }>(`${this.apiUrlPerson}?language=en-US&page=${page}`)
        );
      }
  
      // Combine all requests using forkJoin
      return forkJoin(requests).pipe(
        // Combine results from all pages into a single array and filter by popularity
        map((responses) => {
          // Flatten the results from all pages into one array
          const allActors = responses.flatMap(response => response.results);
  
          // Filter actors based on popularity (e.g., only actors with popularity >= 10)
          const filteredActors = allActors.filter(actor => actor.popularity >= 73);
  
          // Pick a random actor from the filtered list
          const randomIndex = Math.floor(Math.random() * filteredActors.length);
          return filteredActors[randomIndex];
        })
      );
    }

    getRandomMovie(): Observable<Movie> {
      const requests = [];
      const totalPages = 50; // You want to fetch up to 50 pages
    
      // The `vote_count.gte=1000` filter ensures that only movies with at least 1000 votes are returned
      const filterParams = 'language=en-US&vote_count.gte=1000';
    
      // Loop through pages 1 to `totalPages` and add the requests
      for (let page = 1; page <= totalPages; page++) {
        requests.push(
          this.http.get<{ results: Movie[] }>(`${this.apiUrlMovie}?${filterParams}&page=${page}`)
        );
      }
    
      // Combine all requests using forkJoin
      return forkJoin(requests).pipe(
        // Combine results from all pages into a single array
        map((responses) => {
          // Flatten the results from all pages into one array
          const allMovies = responses.flatMap(response => response.results);
    
          // Filter movies based on the vote count (in this case, it's redundant since the API already filters)
          const filteredMovies = allMovies.filter(movie => movie.vote_count >= 1000);
    
          // Pick a random movie from the filtered list
          const randomIndex = Math.floor(Math.random() * filteredMovies.length);
          return filteredMovies[randomIndex];
        })
      );
    }
  }