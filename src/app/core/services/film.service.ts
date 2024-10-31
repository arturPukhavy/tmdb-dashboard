import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie-model/movie.model";
import { MovieCast } from "../models/movie-model/movie.cast.model";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { Video } from "../models/movie-model/video.model";

@Injectable({
    providedIn: 'root'
  })
  export class FilmService {
    private apiUrl = '/3/movie';  
   
    constructor(private http: HttpClient) {}
   
    fetchMovie(id: number): Observable<Movie> { 
      return this.http.get<Movie>(`${this.apiUrl}/${id}`);
    }

    fetchActors(id: number): Observable<MovieCast> {  
      return this.http.get<MovieCast>(`${this.apiUrl}/${id}/credits`);
    }

    fetchImages(id: number): Observable<Movie> {  
      return this.http.get<Movie>(`${this.apiUrl}/${id}/images`);
    }

    fetchRecommendations(id: number): Observable<Movie> {  
      return this.http.get<Movie>(`${this.apiUrl}/${id}/recommendations`);
    }

    fetchVideos(id: number): Observable<{ results: Video[] }> {  
      return this.http.get<{ results: Video[] }>(`${this.apiUrl}/${id}/videos`);
    }
  }