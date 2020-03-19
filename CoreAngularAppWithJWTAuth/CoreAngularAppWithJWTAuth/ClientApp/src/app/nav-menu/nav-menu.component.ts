import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  constructor(private acct: AccountService) { }

  LoginStatus$: Observable<boolean>;
  UserName$: Observable<string>;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  onLogout() {
    this.acct.logout();
  }

  ngOnInit() {
    this.LoginStatus$ = this.acct.isLoggedIn;
    this.UserName$ = this.acct.currentUserName;
  }
}
