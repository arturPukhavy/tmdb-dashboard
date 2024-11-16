import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, expand, map, Observable, tap } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { SearchResponse } from "../models/model-response/search-response.model";

@Injectable({
    providedIn: 'root'
  })
  export class MoviesService {
    totalMoviePages: number = 0;

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

    getNewMovies(page: number = 1): Observable<MovieOverview[]> {
      let allMovies: MovieOverview[] = [];
      const today = new Date().toISOString().slice(0, 10);
    
      return this.fetchNewMoviesPage(page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((result): result is MovieOverview => 'release_date' in result && new Date(result.release_date) <= new Date(today));
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }  
    private fetchNewMoviesPage(page: number = 1): Observable<SearchResponse> {
      const queryParams = {
        'primary_release_date.lte': new Date().toISOString().slice(0, 10),
        'sort_by': 'primary_release_date.desc',
        'page': page
      };
      const params = new HttpParams({ fromObject: queryParams });
      return this.http.get<SearchResponse>(this.apiNewMovies, { params });
    }


    getUpcomingMovies(page: number = 1): Observable<MovieOverview[]> {
      let allMovies: MovieOverview[] = [];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
    
      return this.fetchUpcomingMoviesPage(page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((result): result is MovieOverview => 'release_date' in result);
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }  
    private fetchUpcomingMoviesPage(page: number = 1): Observable<SearchResponse> {
      const queryParams = {
        sort_by: 'release_date.desc',
        page: page
      };
      const params = new HttpParams({ fromObject: queryParams });
      return this.http.get<SearchResponse>(this.apiUpcomingMovies, { params });
    }


    getPopularMovies(page: number = 1): Observable<MovieOverview[]> {
      let allMovies: MovieOverview[] = [];
    
      return this.fetchPopularMoviesPage(page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results;
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }   
    private fetchPopularMoviesPage(page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${this.apiPopularMovies}?page=${page}`);
    }



    getHorrorMovies(page: number = 1): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiHorrorMovies}&sort_by=vote_average.desc&vote_count.gte=5000`;
      let allMovies: MovieOverview[] = [];
    
      return this.fetchHorrorMoviesPage(apiUrl, page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((movie) => movie.vote_count >= 5000);
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }    
    private fetchHorrorMoviesPage(apiUrl: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }

    getComedyMovies(page: number = 1): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiComedyMovies}&sort_by=vote_average.desc&vote_count.gte=3000`;
      let allMovies: MovieOverview[] = [];
    
      return this.fetchComedyMoviesPage(apiUrl, page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((movie) => movie.vote_count >= 5000);
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }    
    private fetchComedyMoviesPage(apiUrl: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }

    getAnimationMovies(page: number = 1): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiAnimationMovies}&sort_by=vote_average.desc&vote_count.gte=3000`;
      let allMovies: MovieOverview[] = [];
    
      return this.fetchAnimationMoviesPage(apiUrl, page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((movie) => movie.vote_count >= 5000);
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }    
    private fetchAnimationMoviesPage(apiUrl: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }


    

    getActionMovies(page: number = 1): Observable<MovieOverview[]> {
      const apiUrl = `${this.apiActionMovies}&sort_by=vote_average.desc&vote_count.gte=3000`;
      let allMovies: MovieOverview[] = [];
    
      return this.fetchActionMoviesPage(apiUrl, page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((movie) => movie.vote_count >= 5000);
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }   
    private fetchActionMoviesPage(apiUrl: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }
    

    getFantasyMovies(page: number = 1): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiFantasyMovies}&sort_by=vote_average.desc&vote_count.gte=3000`;
      let allMovies: MovieOverview[] = [];
    
      return this.fetchFantasyMoviesPage(apiUrl, page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((movie) => movie.vote_count >= 5000);
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }    
    private fetchFantasyMoviesPage(apiUrl: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }

    getScienceFictionMovies(page: number = 1): Observable<MovieOverview[]> {     
      const apiUrl = `${this.apiScienceFictionMovies}&sort_by=vote_average.desc&vote_count.gte=3000`;
      let allMovies: MovieOverview[] = [];
    
      return this.fetchScienceFictionMoviesPage(apiUrl, page).pipe(
        map(response => {
          this.totalMoviePages = response.total_pages;
          return response.results.filter((movie) => movie.vote_count >= 5000);
        }),
        tap(movies => allMovies = [...allMovies, ...movies] as MovieOverview[]),
        map(() => allMovies)
      );
    }    
    private fetchScienceFictionMoviesPage(apiUrl: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${apiUrl}&page=${page}`);
    }     
  }    