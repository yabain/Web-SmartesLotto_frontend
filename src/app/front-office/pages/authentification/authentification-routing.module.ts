import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { LoginComponent } from './login/login.component';
import { NewPwdComponent } from './new-pwd/new-pwd.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'signup', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-pwd',
    component: ForgotPwdComponent
  },
  {
    path: 'new-pwd',
    component: NewPwdComponent
  },
  { path: '**', redirectTo: 'front', pathMatch: 'full' },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
