import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./modules/management/management.module').then((m) => m.ManagementModule),
  },

  {
    path: 'account',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'board',
    loadChildren: () => import('./modules/boards/board.module').then((m) => m.BoardModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
