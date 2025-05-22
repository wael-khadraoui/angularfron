import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User, UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: User = {
    nom: '',
    prenom: '',
    email: '',
    age: 0,
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createUser(this.user).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès !');
        this.router.navigate(['/users']); // redirection vers liste par exemple
      },
      error: err => {
        console.error('Erreur lors de la création', err);
        alert("Une erreur est survenue lors de l'ajout de l'utilisateur.");
      }
    });
  }
}
