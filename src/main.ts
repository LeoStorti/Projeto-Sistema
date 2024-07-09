// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app/app.routes'; // Importando as rotas definidas

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Utilizando as rotas importadas
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule // Certifique-se de importar HttpClientModule
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
});
