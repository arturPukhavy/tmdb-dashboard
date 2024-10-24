import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Person } from "../models/person-model/person.model";

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
  }