import { Routes } from '@angular/router';

import { authRoutes } from '../pages/(auth)/auth.routes';

export const unauthenticatedRoutes: Routes = [
  {
    path: '',
    children: authRoutes
  }
];
