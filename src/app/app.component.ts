import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
export class AppComponent implements OnInit {
  showBackButton = true;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    this.updateBackButtonVisibility(); // Initial check
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateBackButtonVisibility(); // Check route after navigation
      }
    });
  }

  // Listen to window resize events and update the button visibility
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateBackButtonVisibility();
  }

  updateBackButtonVisibility(): void {
    const isMobile = window.innerWidth <= 768; // Mobile screen size
    const isHomePage = this.router.url === '/' || this.router.url === '/home';

    // Show back button only if not on mobile and not on home page
    this.showBackButton = !isMobile && !isHomePage;
  }

  goBack(): void {
    this.location.back(); // Navigates to the previous route
  }
}
