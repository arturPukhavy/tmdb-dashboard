import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { SearchResponse } from "../models/model-response/search-response.model";


@Injectable({
    providedIn: 'root'
  })
  export class MoviesService {
    private apiNewMovies = '/3/movie/now_playing';  
    private apiTrendingMovies = '/3/trending/movie/week?language=en-US';
    private apiUpcomingMovies = '/3/movie/upcoming?language=en-US&page=20';
    
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

      getUpcomingMovies(query: string): Observable<MovieOverview[]> {
        return this.http.get<SearchResponse>(`${this.apiUpcomingMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'original_title' in result))
        );
      }
  }