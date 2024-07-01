// src/app/components/frmprinc/frmprinc.component.ts
import { Component } from '@angular/core';
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
export class FrmprincComponent {
  TestClick() {
    console.log('TesteBotão');
  }
}
