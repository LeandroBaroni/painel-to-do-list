import { Routes } from '@angular/router';

export const toDoRoutes: Routes = [
  {
    path: '',
    title: 'To-Do itens',
    loadComponent: () => import('./list-items/list-items.component').then(m => m.ListItemsComponent)
  },
  {
    path: 'criar',
    title: 'Criar item',
    loadComponent: () => import('./create-item/create-item.component').then(p => p.CreateItemComponent)
  }
];
