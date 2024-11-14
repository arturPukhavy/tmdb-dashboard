import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { SearchResponse } from "../models/model-response/search-response.model";
import { PersonOverview } from "../models/model-response/person-overview.model";


@Injectable({
    providedIn: 'root'
  })
  export class HomeService {
    private apiNewMovies = '/3/movie/now_playing?language=en-US&page=1';  
    private apiTrendingMovies = '/3/trending/movie/week?language=en-US';
    private apiUpcomingMovies = '/3/movie/upcoming?language=en-US&page=20';
    private apiPopularMovies = '/3/movie/popular?language=en-US&page=2';
    private apiTrendingPeople = '/3/trending/person/day?language=en-US';
    
    constructor(private http: HttpClient) {}
  
    getNewMovies(query: string): Observable<MovieOverview[]> {     
      return this.http.get<SearchResponse>(`${this.apiNewMovies}?query=${query}`).pipe(
        // Extract the results array from the SearchResponse
        map(response => response.results.filter((result): result is MovieOverview => 'original_title' in result))
      );
    }

    getTrendingMovies(query: string): Observable<MovieOverview[]> {
        return this.http.get<SearchResponse>(`${this.apiTrendingMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'original_title' in result))
        );
      }

      getTrendingPeople(query: string): Observable<PersonOverview[]> {
        return this.http.get<SearchResponse>(`${this.apiTrendingPeople}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is PersonOverview => 'name' in result))
        );
      }

      getUpcomingMovies(query: string): Observable<MovieOverview[]> {
        return this.http.get<SearchResponse>(`${this.apiUpcomingMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'original_title' in result))
        );
      }

      getPopularMovies(query: string): Observable<MovieOverview[]> {
        return this.http.get<SearchResponse>(`${this.apiPopularMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'original_title' in result))
        );
      }
  }