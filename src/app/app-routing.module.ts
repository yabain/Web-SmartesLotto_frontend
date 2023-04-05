import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' },
  { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },
  { path: 'reset', redirectTo: 'auth/rest-password', pathMatch: 'full' },
  { path: 'error404', redirectTo: 'front/error404', pathMatch: 'full' },
  {
    path: 'front',
    loadChildren: () =>
      import('./front-office/pages/pages.module').then(
        (m) => m.PagesModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./front-office/pages/authentification/authentification.module').then(
        (m) => m.AuthentificationModule
      ),
  },
  { path: '**', redirectTo: 'front', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
