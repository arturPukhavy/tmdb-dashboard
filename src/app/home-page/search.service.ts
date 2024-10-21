import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { MovieResponse } from "../models/model-response/movie-response.model";

@Injectable({
    providedIn: 'root'
  })
  export class SearchService {
    private apiUrl = 'http://localhost:4200/3/search/movie';  // API endpoint
    private apiKey = '';  
  
    constructor(private http: HttpClient) {}
  
    // Function to get movies from the server based on the search query
    searchMovies(query: string): Observable<MovieOverview[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      });
  
      // Make a GET request with the search query
      return this.http.get<MovieResponse>(`${this.apiUrl}?query=${query}`, { headers }).pipe(
        // Extract the results array from the MovieResponse
        map(response => response.results)
      );
    }
  }