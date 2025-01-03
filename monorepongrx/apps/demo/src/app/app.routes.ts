import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'one',
    loadChildren: () => import('@monorepongrx/one').then(m => m.oneRoutes)
  },
  {
    path: 'two',
    loadChildren: () => import('@monorepongrx/two').then(m => m.twoRoutes)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'one'
  }
];
