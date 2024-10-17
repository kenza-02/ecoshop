import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyauthGuard } from './service/myauth.guard';

const routes: Routes = [
  {
    path: 'admin',
    // canActivate: [MyauthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'portail',
    loadChildren: () =>
      import('./portail/portail.module').then((m) => m.PortailModule),
  },
  { path: '', redirectTo: 'portail', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
