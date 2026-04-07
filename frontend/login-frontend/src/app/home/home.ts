import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  username = signal('');

  constructor(private router: Router) {
    const user =
      localStorage.getItem('username') ||
      sessionStorage.getItem('username') ||
      'Usuario';

    this.username.set(user);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}