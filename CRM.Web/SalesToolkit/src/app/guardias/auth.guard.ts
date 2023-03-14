import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../servicios/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;
      console.log("canactivate");
      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    let sessionId = 123456789;

    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };
    // Navigate to the login page with extras
    this.router.navigate(['/'], navigationExtras);
    return false;
  }
}
