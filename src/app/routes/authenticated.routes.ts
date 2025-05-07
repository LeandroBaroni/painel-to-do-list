import { Routes } from "@angular/router";
import { toDoRoutes } from "../pages/to-do-items/to-do.routes";

export const authenticatedRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../shared/components/layout/layout.component').then(p => p.LayoutComponent),
    children: [
      {
        path: 'itens',
        children: toDoRoutes
      }
    ]
  }
]
