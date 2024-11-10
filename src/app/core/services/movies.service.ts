import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, expand, map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { SearchResponse } from "../models/model-response/search-response.model";

@Injectable({
    providedIn: 'root'
  })
  export class MoviesService {
    private apiNewMovies = '/3/discover/movie';  
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
      const apiUrl = `${this.apiNewMovies}`;
      const today = new Date().toISOString().slice(0, 10);
    
      const queryParams = {
        'primary_release_date.lte': today,
        'sort_by': 'primary_release_date.desc',
        'page': 1
      };
    
      let allMovies: MovieOverview[] = [];
    
      return this.fetchNewMoviesPage(apiUrl, queryParams).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results] as MovieOverview[];
          if (response.page < response.total_pages) {
            queryParams.page++;
            return this.fetchNewMoviesPage(apiUrl, queryParams);
          }
          return EMPTY;
        }),
        map(() => allMovies)
      );
    }
    private fetchNewMoviesPage(apiUrl: string, queryParams: { [key: string]: string | number }): Observable<SearchResponse> {
      const params = new HttpParams({ fromObject: queryParams });
      return this.http.get<SearchResponse>(apiUrl, { params });
    }

    getUpcomingMovies(): Observable<MovieOverview[]> {
      const apiUrl = `${this.apiUpcomingMovies}`;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
      const queryParams = {
        sort_by: 'release_date.desc',
        page: 1
      };
    
      let allMovies: MovieOverview[] = [];
    
      return this.fetchUpcomingMoviesPage(apiUrl, queryParams).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results] as MovieOverview[];
          if (response.page < response.total_pages) {
            queryParams.page++;
            return this.fetchUpcomingMoviesPage(apiUrl, queryParams);
          }
          return EMPTY;
        }),
        map(() => {
          // Filter movies to only include those releasing on or after tomorrow
          return allMovies.filter(movie => new Date(movie.release_date) >= tomorrow);
        })
      );
    }
    private fetchUpcomingMoviesPage(apiUrl: string, queryParams: { [key: string]: string | number }): Observable<SearchResponse> {
      const params = new HttpParams({ fromObject: queryParams });
      return this.http.get<SearchResponse>(apiUrl, { params });
    }


    getPopularMovies(query: string): Observable<MovieOverview[]> {     
      return this.http.get<SearchResponse>(`${this.apiPopularMovies}?query=${query}`).pipe(
        // Extract the results array from the SearchResponse
        map(response => response.results.filter((result): result is MovieOverview => 'title' in result))
      );
    }



    getHorrorMovies(): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiHorrorMovies}&sort_by=vote_average.desc&vote_count.gte=5000`;
      let allMovies: MovieOverview[] = [];
      let page = 1;
    
      return this.fetchHorrorMoviesPage(apiUrl, page).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results.filter((movie) => movie.vote_count >= 5000)] as MovieOverview[];
          if (response.page < response.total_pages) {
            page++;
            return this.fetchHorrorMoviesPage(apiUrl, page);
          }
          return EMPTY;
        }),
        map(() => allMovies)
      );
    }    
    private fetchHorrorMoviesPage(apiUrl: string, page: number): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }

    getComedyMovies(): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiComedyMovies}&sort_by=vote_average.desc&vote_count.gte=5000`;
      let allMovies: MovieOverview[] = [];
      let page = 1;
    
      return this.fetchComedyMoviesPage(apiUrl, page).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results.filter((movie) => movie.vote_count >= 5000)] as MovieOverview[];
          if (response.page < response.total_pages) {
            page++;
            return this.fetchComedyMoviesPage(apiUrl, page);
          }
          return EMPTY;
        }),
        map(() => allMovies)
      );
    }    
    private fetchComedyMoviesPage(apiUrl: string, page: number): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }

    getAnimationMovies(): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiAnimationMovies}&sort_by=vote_average.desc&vote_count.gte=5000`;
      let allMovies: MovieOverview[] = [];
      let page = 1;
    
      return this.fetchAnimationMoviesPage(apiUrl, page).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results.filter((movie) => movie.vote_count >= 5000)] as MovieOverview[];
          if (response.page < response.total_pages) {
            page++;
            return this.fetchAnimationMoviesPage(apiUrl, page);
          }
          return EMPTY;
        }),
        map(() => allMovies)
      );
    }    
    private fetchAnimationMoviesPage(apiUrl: string, page: number): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }


    

    getActionMovies(): Observable<MovieOverview[]> {
      const apiUrl = `${this.apiActionMovies}&sort_by=vote_average.desc&vote_count.gte=5000`;
      let allMovies: MovieOverview[] = [];
      let page = 1;
    
      return this.fetchActionMoviesPage(apiUrl, page).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results.filter((movie) => movie.vote_count >= 5000)] as MovieOverview[];
          if (response.page < response.total_pages) {
            page++;
            return this.fetchActionMoviesPage(apiUrl, page);
          }
          return EMPTY;
        }),
        map(() => allMovies)
      );
    }    
    private fetchActionMoviesPage(apiUrl: string, page: number): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }

    getFantasyMovies(): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiFantasyMovies}&sort_by=vote_average.desc&vote_count.gte=5000`;
      let allMovies: MovieOverview[] = [];
      let page = 1;
    
      return this.fetchFantasyMoviesPage(apiUrl, page).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results.filter((movie) => movie.vote_count >= 5000)] as MovieOverview[];
          if (response.page < response.total_pages) {
            page++;
            return this.fetchFantasyMoviesPage(apiUrl, page);
          }
          return EMPTY;
        }),
        map(() => allMovies)
      );
    }    
    private fetchFantasyMoviesPage(apiUrl: string, page: number): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }

    getScienceFictionMovies(): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiScienceFictionMovies}&sort_by=vote_average.desc&vote_count.gte=5000`;
      let allMovies: MovieOverview[] = [];
      let page = 1;
    
      return this.fetchScienceFictionMoviesPage(apiUrl, page).pipe(
        expand((response) => {
          allMovies = [...allMovies, ...response.results.filter((movie) => movie.vote_count >= 5000)] as MovieOverview[];
          if (response.page < response.total_pages) {
            page++;
            return this.fetchScienceFictionMoviesPage(apiUrl, page);
          }
          return EMPTY;
        }),
        map(() => allMovies)
      );
    }    
    private fetchScienceFictionMoviesPage(apiUrl: string, page: number): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }     
  }    