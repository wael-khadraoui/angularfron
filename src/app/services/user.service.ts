import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  age: number;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5002';

  constructor(private http: HttpClient) {}

  // ✅ Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // ✅ Récupérer un utilisateur par ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // ✅ Créer un utilisateur (différent de register car pas de vérif d'email existant)
  createUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  // ✅ Mettre à jour un utilisateur
  updateUser(id: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  // ✅ Supprimer un utilisateur
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // ✅ Enregistrement (register)
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // ✅ Connexion (login)
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
