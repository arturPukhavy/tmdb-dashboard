import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { MovieResponse } from "../models/model-response/movie-response.model";

@Injectable({
    providedIn: 'root'
  })
  export class MoviesService {
    private apiNewMovies = 'http://localhost:4200/3/movie/now_playing?language=en-US&page=1';  
    private apiTrendingMovies = 'http://localhost:4200/3/trending/movie/week?language=en-US';
    private apiUpcomingMovies = 'http://localhost:4200/3/movie/upcoming?language=en-US&page=23';
    private apiKey = '';  
  
    constructor(private http: HttpClient) {}
  
    getNewMovies(query: string): Observable<MovieOverview[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      });
      return this.http.get<MovieResponse>(`${this.apiNewMovies}?query=${query}`, { headers }).pipe(
        // Extract the results array from the MovieResponse
        map(response => response.results)
      );
    }

    getTrendingMovies(query: string): Observable<MovieOverview[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.apiKey}`,
          'accept': 'application/json'
        });
        return this.http.get<MovieResponse>(`${this.apiTrendingMovies}?query=${query}`, { headers }).pipe(
          // Extract the results array from the MovieResponse
          map(response => response.results)
        );
      }

      getUpcomingMovies(query: string): Observable<MovieOverview[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.apiKey}`,
          'accept': 'application/json'
        });
        return this.http.get<MovieResponse>(`${this.apiUpcomingMovies}?query=${query}`, { headers }).pipe(
          // Extract the results array from the MovieResponse
          map(response => response.results)
        );
      }
  }