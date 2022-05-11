import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './modules/management/page/error-page/error-page.component';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { WelcomePageComponent } from './modules/management/page/welcome-page/welcome-page.component';
import { WelcomeGuard } from './modules/core/guards/welcome.guard';

const routes: Routes = [
  {
    path: 'main',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    canDeactivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
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
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
