import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginNoAccessGuard implements CanActivate {
  constructor(
    public als: AlertService,
    public router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // return this.authService.isLogin();//if the user is logged in, return true
    if (JSON.parse(localStorage.getItem('user')) != null)
      this.als.expectFeedback("Already logged in. Redirecting to user profile page.").then(w => {
        console.log(w);
        this.router.navigate(['tabs/account']);
        return false;
      });
    else
      return true;
  }

}
