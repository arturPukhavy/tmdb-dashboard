import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Movie } from "../models/movie-model/movie.model";

@Injectable({
    providedIn: 'root'
  })
  export class FilmService {
    private apiUrl = 'http://localhost:4200/3/movie';  // API endpoint
    private apiKey = '';  
  
    constructor(private http: HttpClient) {}
  
    
    fetchMovie(id: number): Observable<Movie> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      });
  
      return this.http.get<Movie>(`${this.apiUrl}/${id}`, { headers });
      
    }
  }