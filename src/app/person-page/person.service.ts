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
    private apiUrl = 'http://localhost:4200/3/person';  
    
    constructor(private http: HttpClient) {}
  
    fetchPerson(id: number): Observable<Person> {
      return this.http.get<Person>(`${this.apiUrl}/${id}`);
    }

    fetchPersonMovie(id: number): Observable<PersonCast> {
      return this.http.get<PersonCast>(`${this.apiUrl}/${id}/movie_credits`);
    }
  }