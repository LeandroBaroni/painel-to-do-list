import { Routes } from '@angular/router';

import { ensureAuthentication } from '@guards/ensure-authentication.guard';
import { ensureUnauthenticated } from '@guards/ensure-unauthentication.guard';

import { authenticatedRoutes } from './authenticated.routes';
import { unauthenticatedRoutes } from './unauthenticated.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registrar',
    pathMatch: 'full'
  },

  {
    path: '',
    canActivateChild: [ensureUnauthenticated()],
    children: unauthenticatedRoutes
  },
  {
    path: '',
    canActivateChild: [ensureAuthentication()],
    children: authenticatedRoutes
  }
];
