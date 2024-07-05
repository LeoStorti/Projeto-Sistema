import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7219/api'; // Caminho API

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: any): Observable<LoginResponse> {
    console.log('Sending login request:', loginRequest); // Log para depuração
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
      tap(response => {
        console.log('Server response:', response); // Log para depuração
        if (response && response.message === 'Login successful') {
          localStorage.setItem('auth_token', response.token); // Armazena o token no localStorage
          console.log('Token stored in localStorage:', localStorage.getItem('auth_token')); // Verifica se o token está sendo armazenado corretamente
          console.log('Login successful, navigating to /frmprinc');
          this.router.navigate(['/frmprinc']); // Redireciona para a próxima página
        } else {
          console.error('Login failed: Unexpected response format', response);
        }
      }),
      catchError(error => {
        console.error('Login failed: HTTP error', error);
        throw error; // Lança o erro para ser tratado pelo código que chama login()
      })
    )
  }
  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const authToken = localStorage.getItem('auth_token');
      return authToken !== null; // Retorna true se o token estiver presente, false caso contrário
    }
    return false;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
