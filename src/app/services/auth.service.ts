import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
      },
      error => {
        console.error('Login failed: HTTP error', error);
      })
    );
  }}
