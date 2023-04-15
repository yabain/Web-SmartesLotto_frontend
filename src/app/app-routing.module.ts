import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './services/guard/auth/authentication.guard';

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
      // canActivate: [AuthenticationGuard],
  },
  {
    path: 'mail',
    loadChildren: () =>
      import(
        './front-office/pages/authentification/mail-link/mail-link.module'
      ).then((m) => m.MailLinkModule),
  },
  {
    path: 'invoice-reports',
    loadChildren: () =>
      import('./back-office/all-modules/invoice-reports/invoice-reports.module').then(
        (m) => m.InvoiceReportsModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'lotteries',
    loadChildren: () =>
      import('./back-office/all-modules/lotteries/lotteries.module').then(
        (m) => m.LotteriesModule
      ),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'index',
    loadChildren: () =>
      import('./back-office/all-modules/all-modules.module').then(m => m.AllModulesModule),
    canActivate: [AuthenticationGuard],
  },
  { path: '**', redirectTo: 'index', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
