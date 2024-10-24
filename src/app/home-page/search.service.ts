import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { PersonOverview } from "../models/model-response/person-overview.model";
import { SearchResponse } from "../models/model-response/movie-response.model";

@Injectable({
    providedIn: 'root'
  })
  export class SearchService {
    private apiUrlMovie = 'http://localhost:4200/3/search/movie';  
    private apiUrlPerson = 'http://localhost:4200/3/search/person';  
    private apiKey = '';  
  
    constructor(private http: HttpClient) {}
  
    searchMovies(query: string): Observable<MovieOverview[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      });
      // Make a GET request with the search query
      return this.http.get<SearchResponse>(`${this.apiUrlMovie}?query=${query}`, { headers }).pipe(
        // Extract the results array from the SearchResponse
        map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
      );
    }

    searchPersons(query: string): Observable<PersonOverview[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      }); 
      // Make a GET request with the search query
      return this.http.get<SearchResponse>(`${this.apiUrlPerson}?query=${query}`, { headers }).pipe(
        // Extract the results array from the SearchResponse
        map(response => response.results.filter((result): result is PersonOverview => 'name' in result))
      );
    }
  }