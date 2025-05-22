import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User = {
    id: '',          // ← assure‑toi que l’interface User contient id, nom, prenom, email, age
    nom: '',
    prenom: '',
    email: '',
    age: 0
  };

  loading = true;      // pour afficher un petit spinner si besoin
  submitInProgress = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      alert('Identifiant utilisateur manquant.');
      this.router.navigate(['/users']);
      return;
    }

    const id = +idParam;
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        alert("Impossible de charger l'utilisateur.");
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit(): void {
    this.submitInProgress = true;
    this.userService.updateUser(this.user.id!, this.user).subscribe({
      next: () => {
        alert('Utilisateur mis à jour avec succès !');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        alert("Une erreur est survenue lors de la mise à jour de l'utilisateur.");
        this.submitInProgress = false;
      }
    });
  }
}
