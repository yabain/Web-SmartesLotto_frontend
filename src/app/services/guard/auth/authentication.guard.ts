import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
