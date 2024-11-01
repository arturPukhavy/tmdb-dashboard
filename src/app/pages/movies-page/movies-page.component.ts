import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MoviesService } from '../../core/services/movies.service';
import { Genre } from '../../core/models/movie-model/genre.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent {
  categories = [
    { name: 'New', imageUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg', slug: 'new' },
    { name: 'Popular', imageUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/oPUOpnl3pqD8wuidjfUn17mO1yA.jpg', slug: 'popular' },
    { name: 'Upcoming', imageUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg', slug: 'upcoming' },
    { name: 'Horror', imageUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/mmd1HnuvAzFc4iuVJcnBrhDNEKr.jpg', slug: 'horror' },
    { name: 'Comedy', imageUrl: 'https://media.themoviedb.org/t/p/w500_and_h282_face/2UHYx0hXoiNlbubRC4s2wxxw0Gf.jpg', slug: 'comedy' },
    { name: 'Animation', imageUrl: 'https://media.themoviedb.org/t/p/w500_and_h282_face/tY9LamrNWpyyGdt0BkizpLOSBEO.jpg', slug: 'animation' },
    { name: 'Action', imageUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/y2DB71C4nyIdMrANijz8mzvQtk6.jpg', slug: 'action' },
    { name: 'Fantasy', imageUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg', slug: 'fantasy' },
    { name: 'Sci-Fi', imageUrl: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/xJHokMbljvjADYdit5fK5VQsXEG.jpg', slug: 'science-fiction' }
  ];

  constructor() {} 

}
