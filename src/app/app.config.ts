import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Injectable } from '@angular/core';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()]

};
