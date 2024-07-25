import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginRequest {
  login: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  message: string;
  login: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7219/api';
  private readonly LOGIN_TIME_KEY = 'login_time';
  private readonly LOGIN_KEY = 'login';

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
      tap(response => {
        console.log('Server response:', response); // Log para depuração
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem(this.LOGIN_TIME_KEY, new Date().toISOString());
          localStorage.setItem(this.LOGIN_KEY, response.login);
          console.log('Token stored in localStorage:', localStorage.getItem('auth_token'));
          console.log('Login stored in localStorage:', localStorage.getItem(this.LOGIN_KEY));
          this.router.navigate(['/frmprinc']);
        } else {
          console.error('Login failed: Unexpected response format', response);
          throw new Error('Login failed: Unexpected response format');
        }
      }),
      catchError(error => {
        console.error('Login failed: HTTP error', error);
        return throwError(error);
      })
    );
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const authToken = localStorage.getItem('auth_token');
      return authToken !== null;
    }
    return false;
  }

  getLogin(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.LOGIN_KEY);
    }
    return null;
  }

  getUserName(): string {
    return this.getLogin() || 'Usuário Desconhecido'; // Retorna o login ou um valor padrão
  }

  getSessionDuration(): string {
    const loginTime = localStorage.getItem(this.LOGIN_TIME_KEY);
    if (loginTime) {
      const loginDate = new Date(loginTime);
      const now = new Date();
      const durationMs = now.getTime() - loginDate.getTime();
      const durationMinutes = Math.floor(durationMs / (1000 * 60));
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
    return 'Não disponível';
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
