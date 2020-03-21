import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private acct: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.acct.isLoggedIn.pipe(take(1), map((loginStatus: boolean) => {
      const destination: string = state.url;
      const productId = route.params.id;

      // To check if user is not logged in
      if (!loginStatus) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        return false;
      }
      
      // if the user is already logged in
      switch (destination) {
        case '/products':
        case '/products/' + productId: {
            if (localStorage.getItem('userRole') === 'Customer' || localStorage.getItem('userRole') === 'Admin' || localStorage.getItem('userRole') === 'Moderator') {
              return true;
            }
          }
        // tslint:disable-next-line:no-switch-case-fall-through
        case '/products/update': {
            if (localStorage.getItem('userRole') === 'Customer' || localStorage.getItem('userRole') === 'Moderator') {
              this.router.navigate(['/access-denied'])

              return false;
            }

            if (localStorage.getItem('userRole') === 'Admin') {

              return true;
            }
        }
        //case '/register':
        //case '/login': {
        //  if (localStorage.getItem('loginStatus') === '1') {
        //    if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        //      this.router.navigate(['/home']);
        //      return false;
        //    }
        //  }
        //}

        // tslint:disable-next-line:no-switch-case-fall-through
        default:
          return false;
      }

    }));
  }
}
