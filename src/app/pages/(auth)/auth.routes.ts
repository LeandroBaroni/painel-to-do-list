import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registrar',
    title: 'Registrar',
    loadComponent: () => import('./register/register.component').then(p => p.RegisterComponent)
  }
];
