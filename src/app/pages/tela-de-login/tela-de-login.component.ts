import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tela-de-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tela-de-login.component.html',
  styleUrls: ['./tela-de-login.component.css']
})
export class TelaDeLoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      login: ['LeoStorti'],
      senha: ['123']
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login data submitted:', loginData); // Log para depuração
      this.authService.login(loginData).subscribe(
        response => {
          console.log('Login successful response:', response);
        },
        error => {
          console.error('Login failed response:', error);
          // Trate o erro conforme necessário
        }
      );
    }
  }

  onLogout() {
    // Adicione lógica de logout aqui
  }
}
