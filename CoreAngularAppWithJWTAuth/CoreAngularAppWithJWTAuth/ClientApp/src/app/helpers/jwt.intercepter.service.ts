import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtIntercepterService implements HttpInterceptor {

  constructor(private acct: AccountService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add authorization header with jwt token if available
    const currentuser = this.acct.isLoggedIn;
    const token = localStorage.getItem('jwt');

    if (currentuser && token !== undefined) {
      request = request.clone({
        setHeaders:
        {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(request);
    }
  }
}
