// src/app/components/frmprinc/frmprinc.component.ts
import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-frmprinc',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './frmprinc.component.html',
  styleUrls: ['./frmprinc.component.css']
})
export class FrmprincComponent implements OnInit {
  userName: string = 'Usuário'; // Substitua com o nome do usuário logado
  currentTime: string = '';

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Atualiza a hora a cada segundo
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // Exibe no formato HH:MM:SS
  }

  TestClick() {
    console.log('TesteBotão');
  }
}
