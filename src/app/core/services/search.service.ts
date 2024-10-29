import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { SearchResponse } from "../models/model-response/search-response.model";

@Injectable({
    providedIn: 'root'
  })
  export class SearchService {
    private apiUrlMovie = '/3/search/movie';  
    private apiUrlPerson = '/3/search/person';   
  
    constructor(private http: HttpClient) {}
  
    searchMovies(query: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${this.apiUrlMovie}?query=${query}&page=${page}`);
    }

    searchPersons(query: string, page: number = 1): Observable<SearchResponse> {
      return this.http.get<SearchResponse>(`${this.apiUrlPerson}?query=${query}&page=${page}`);
    }

  }