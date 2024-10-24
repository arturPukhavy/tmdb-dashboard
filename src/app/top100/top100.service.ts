import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map, Observable } from "rxjs";
import { MovieOverview } from "../models/model-response/movie-overview.model";

@Injectable({
    providedIn: 'root'
  })
  export class top100Service {
    private apiUrl = 'http://localhost:4200/3/movie/top_rated?language=en-US&page=1';  // API endpoint
    private apiKey = '';  
  
    constructor(private http: HttpClient) {}
  
    getTopMovies(): Observable<MovieOverview[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.apiKey}`,
          'accept': 'application/json'
        });

        const requests = [];
        const totalPages = 5; 

        // Loop through pages 1 to 5
        for (let page = 1; page <= totalPages; page++) {
          requests.push(
            this.http.get<any>(`${this.apiUrl}?language=en-US&page=${page}`, { headers })
          );
        }

        // Combine all requests and return the combined results
        return forkJoin(requests).pipe(
          map(responses => responses.flatMap(response => response.results))
        );
      }
  }