import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    public aus: AuthService,
    public als: AlertService,
    public router: Router,
  ) { }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // return this.authService.isLogin();//if the user is logged in, return true
    if (!this.aus.isLogin())
      this.als.expectFeedback("Please Sign in to continue").then(w => {
        console.log(w);
        this.router.navigate(['tabs/account/login']);
        return false;
      });
    else
      return true;
  }
}
