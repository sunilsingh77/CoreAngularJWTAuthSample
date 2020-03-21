import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrlLogin = '/api/account/login';
  private baseUrlRegister = '/api/account/register';

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('password'));

  register(username: string, password: string, email: string) {
    return this.http.post<any>(this.baseUrlRegister, { username, password, email }).pipe(map(result => {
      // registration was successful
      return result;

    }, error => {
      return error;
    }));
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrlLogin, { username, password })
      .pipe(
        map(result => {
          if (result && result.token) {
            this.loginStatus.next(true);
            localStorage.setItem('loginStatus', '1');
            localStorage.setItem('jwt', result.token);
            localStorage.setItem('username', result.username);
            localStorage.setItem('expiration', result.expiration);
            localStorage.setItem('userRole', result.userrole);
            this.UserName.next(localStorage.getItem('username'));
            this.UserRole.next(localStorage.getItem('userRole'));
          }
          return result;
        })
      );
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);

    console.log('Logged-out Successfully!');
  }

  checkLoginStatus(): boolean {
    const loginCookie = localStorage.getItem('loginStatus');

    if (loginCookie === '1') {
      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }

      // Get and Decode the Token
      const token = localStorage.getItem('jwt');
      const decoded = <any>jwt_decode(token);
      // Check if the cookie is valid

      if (decoded.exp === undefined) {
        return false;
      }

      // Get Current Date Time
      const date = new Date(0);

      // Convert EXp Time to UTC
      const tokenExpDate = date.setUTCSeconds(decoded.exp);

      // If Value of Token time greter than
      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        return true;
      }

      console.log('New DATE ' + new Date().valueOf());
      console.log('Token DATE ' + tokenExpDate.valueOf());

      return false;
    }
    return false;
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}
