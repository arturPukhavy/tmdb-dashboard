import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showBackButton = true;

  constructor(private location: Location, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event.url !== '/' && event.url !== '/home') {
        this.showBackButton = true; // Don't show the button on the first page
      } else {
        this.showBackButton = false;
      }
    });
  }

  goBack(): void {
    this.location.back(); // Navigates to the previous route
  }
}
