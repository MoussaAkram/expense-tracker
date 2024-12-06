import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ExpensesComponent} from './components/expenses/expenses.component';
import {HeaderComponent} from './components/header/header.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ExpensesComponent, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front-end';
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updateHeaderVisibility();
    });
  }

  updateHeaderVisibility() {
    const urlTree = this.router.parseUrl(this.router.url);
    const basePath = urlTree.root.children['primary']?.segments.map(segment => segment.path).join('/') || '';

    // Hide header on login and register routes
    const hiddenRoutes = ['/login', '/register'];
    this.showHeader = !hiddenRoutes.includes(`/${basePath}`);
  }
}
