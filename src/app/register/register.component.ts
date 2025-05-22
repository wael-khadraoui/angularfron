import { Component } from '@angular/core';
import { UserService, User } from '../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user: User = {
    nom: '',
    prenom: '',
    email: '',
    age: 0,
    password: ''
  };

  termsAccepted = false;
  message = '';

  constructor(private userService: UserService ,  private router: Router) {}

  register() {
    if (!this.termsAccepted) {
      this.message = "Veuillez accepter les conditions.";
      return;
    }

    this.userService.register(this.user).subscribe({
      next: () => {
        this.message = 'Inscription réussie ✅';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500); // Redirection après 1.5 seconde
      },
      error: (err) => {
        this.message = err.error?.error || 'Erreur ❌';
      }
    });
  }

}
