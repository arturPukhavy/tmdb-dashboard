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
      const totalPages = 30; 
      const pagesToFetch = 2; // Number of pages to fetch
    
      // Generate an array of random page numbers to fetch
      const randomPages = Array.from({ length: pagesToFetch }, () => 
        Math.floor(Math.random() * totalPages) + 1
      );
    
      // Create the requests for the random pages
      const requests = randomPages.map(page =>
        this.http.get<{ results: Person[] }>(`${this.apiUrlPerson}?language=en-US&page=${page}`)
      );
    
      // Combine all the requests using forkJoin
      return forkJoin(requests).pipe(
        // Combine results from all fetched pages
        map((responses) => {
          // Flatten the results from all pages into one array
          const allActors = responses.flatMap(response => response.results);
    
          // Filter actors based on popularity (e.g., only actors with popularity >= 30)
          const filteredActors = allActors.filter(actor => actor.popularity >= 30);
    
          // Pick a random actor from the filtered list
          const randomIndex = Math.floor(Math.random() * filteredActors.length);
          return filteredActors[randomIndex];
        })
      );
    }

    getRandomMovie(): Observable<Movie> {
      const totalPages = 50; // You want to fetch up to 50 pages
      const pagesToFetch = 2; // Number of pages to fetch
    
      // Generate an array of random page numbers to fetch
      const randomPages = Array.from({ length: pagesToFetch }, () => 
        Math.floor(Math.random() * totalPages) + 1
      );
    
      // Create the requests for the random pages
      const requests = randomPages.map(page =>
        this.http.get<{ results: Movie[] }>(`${this.apiUrlMovie}?language=en-US&page=${page}`)
      );
    
      // Combine all requests using forkJoin
      return forkJoin(requests).pipe(
        // Combine results from all pages into a single array
        map((responses) => {
          // Flatten the results from all pages into one array
          const allMovies = responses.flatMap(response => response.results);
    
          // Filter movies based on the vote count (in this case, it's redundant since the API already filters)
          const filteredMovies = allMovies.filter(movie => movie.vote_count >= 2500);
    
          // Pick a random movie from the filtered list
          const randomIndex = Math.floor(Math.random() * filteredMovies.length);
          return filteredMovies[randomIndex];
        })
      );
    }
  }