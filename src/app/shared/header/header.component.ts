import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, withNavigationErrorHandler } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  listOfitems: string = '';

  constructor(private router: Router) {}

  onSearchInput() {
    if (this.listOfitems.trim() !== '') {
      this.router.navigate(['/search', this.listOfitems ])
    }
  }

}
