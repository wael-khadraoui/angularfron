import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;

  constructor(private userService: UserService  ,  private router: Router // <-- Injecter Router
) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        this.loading = false;
      }
    });
  }

  deleteUser(id: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.getUsers(), // Refresh list
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }
  goToAddUser(): void {
    this.router.navigate(['/AddUser']); // <-- Redirection
  }

}
