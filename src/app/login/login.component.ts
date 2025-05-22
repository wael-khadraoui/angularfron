import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    this.userService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        // Stocke le token ou l'utilisateur si nécessaire ici
        // localStorage.setItem('token', response.token); // exemple
        this.message = 'Connexion réussie ✅';
        this.router.navigate(['/ListeUser']); // Redirection après login
      },
      error: (err) => {
        this.message = err.error?.error || 'Erreur de connexion ❌';
      }
    });
  }
}
