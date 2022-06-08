import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    public aus: AuthService,
    public als: AlertService,
    public router: Router,
  ) { }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!(this.aus.isLogin() && this.aus.isAdmin())) {
        this.als.expectFeedback("Please sign in as Admin to access this page.").then(w => {
          console.log(w);
          this.router.navigate(['tabs/account']);
          return false;
        });
      }
      return true;
  }
}
