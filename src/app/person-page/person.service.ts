import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Person } from "../models/person-model/person.model";
import { MovieOverview } from "../models/model-response/movie-overview.model";
import { PersonCast } from "../models/person-model/person.cast.model";

@Injectable({
    providedIn: 'root'
  })
  export class PersonService {
    private apiUrl = 'http://localhost:4200/3/person';  // API endpoint
    private apiKey = '';  
  
    constructor(private http: HttpClient) {}
  
    fetchPerson(id: number): Observable<Person> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      });
  
      return this.http.get<Person>(`${this.apiUrl}/${id}`, { headers });
    }

    fetchPersonMovie(id: number): Observable<PersonCast> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.apiKey}`,
        'accept': 'application/json'
      });
  
      return this.http.get<PersonCast>(`${this.apiUrl}/${id}/movie_credits`, { headers });
    }
  }