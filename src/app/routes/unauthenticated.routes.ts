import { Routes } from '@angular/router';

import { authRoutes } from '../pages/(auth)/auth.routes';
import { toDoRoutes } from '../pages/to-do-items/to-do.routes';

export const unauthenticatedRoutes: Routes = [
  {
    path: '',
    children: authRoutes
  }
];
