import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {
  constructor(
    public aus: AuthService,
    public als: AlertService,
    public router: Router,
  ) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // console.log(this.aus.isLogin(), ' ------  ', this.aus.isAdmin());
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
