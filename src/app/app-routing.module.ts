import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { WelcomePageComponent } from './modules/management/page/welcome-page/welcome-page.component';
import { WelcomeGuard } from './modules/core/guards/welcome.guard';
import { ErrorPageComponent } from './modules/management/page/error-page/error-page.component';

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
    path: 'welcome',
    canActivate: [WelcomeGuard],
    component: WelcomePageComponent,
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: 'board',
    loadChildren: () => import('./modules/boards/board.module').then((m) => m.BoardModule),
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
