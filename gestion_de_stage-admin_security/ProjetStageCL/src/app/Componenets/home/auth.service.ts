import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
// Assure-toi d'importer correctement jwt-decode
import { user } from '../../model/user.model';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    user: user | undefined;
   
    private apiUrl = 'http://localhost:8080/api/v1/auth'; // URL de ton API d'authentification
  
    constructor(private http: HttpClient) {}
  
    login(credentials: { email: string; password: string }): Observable<any> {
      const loginUrl = `${this.apiUrl}/authenticate`; // Endpoint de connexion dans ton API
  
      return this.http.post<any>(loginUrl,credentials).pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('JwtToken', JSON.stringify(response.token)); // Stocke le token JWT dans le localStorage
            const jwtToken = localStorage.getItem('JwtToken');
            console.log(jwtToken);
          }
          return response;
        }),
        catchError(error => {
          return of(error);
        })
      );
    }
  
    logout(): void {
      localStorage.removeItem('JwtToken');
    }
  
    getToken(): string {
      return JSON.parse(localStorage.getItem('JwtToken') || 'null');
    }
  
    isAuthenticated(): boolean {
      return !!this.getToken();
    }
  
    hasRole(role: string): boolean {
      const currentUser = this.currentUser();
      return !!currentUser && currentUser.role === role;
    }
  
    getHeaders(): HttpHeaders {
      const token = this.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me',
        'Authorization': `Bearer ${token}`
      });
      return headers;
    }
    
  
    currentUser(): user | null {
      if (this.getToken()) {
        const tokenPayload: any = jwtDecode(this.getToken());
        if (tokenPayload) {
          const user: user = {
            role: tokenPayload.role[0].authority,
            email: tokenPayload.sub,
            password: '' // Il est généralement préférable de ne pas stocker le mot de passe dans l'objet User côté client.
          };
          return user;
        }
      }
      return null;
    }
  
    autoLogout(dateExpiration: number): void {
      setTimeout(() => {
        this.logout();
      }, dateExpiration);
    }
  }