import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { SearchResponse } from "../models/model-response/search-response.model";

@Injectable({
    providedIn: 'root'
  })
  export class MoviesService {
    private apiNewMovies = '/3/movie/now_playing';  
    private apiUpcomingMovies = '/3/movie/upcoming';
    private apiPopularMovies = '/3/movie/popular';

    private apiHorrorMovies = '/3/discover/movie?with_genres=27';
    private apiComedyMovies = '/3/discover/movie?with_genres=35';
    private apiAnimationMovies = '/3/discover/movie?with_genres=16';

    private apiActionMovies = '/3/discover/movie?with_genres=28';
    private apiFantasyMovies = '/3/discover/movie?with_genres=14';
    private apiScienceFictionMovies = '/3/discover/movie?with_genres=878';
    
    constructor(private http: HttpClient) {}
  
    getNewMovies(query: string): Observable<MovieOverview[]> {     
      return this.http.get<SearchResponse>(`${this.apiNewMovies}?query=${query}`).pipe(
        // Extract the results array from the SearchResponse
        map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
      );
    }
    getUpcomingMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiUpcomingMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }
      getPopularMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiPopularMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }



      getHorrorMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiHorrorMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }
      getComedyMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiComedyMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }
      getAnimationMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiAnimationMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }


      
      getActionMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiActionMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }
      getFantasyMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiFantasyMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }
      getScienceFictionMovies(query: string): Observable<MovieOverview[]> {     
        return this.http.get<SearchResponse>(`${this.apiScienceFictionMovies}?query=${query}`).pipe(
          // Extract the results array from the SearchResponse
          map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
        );
      }
  }    