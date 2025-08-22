
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => {
        if (this.auth.isLoggedIn()) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}





@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['role'];
    return this.auth.currentUser.pipe(
      take(1),
      map(() => {
        if (!this.auth.isLoggedIn()) {
          this.router.navigate(['/login']);
          return false;
        }
        const role = this.auth.getRole();
        if (role && role.toLowerCase() === expectedRole.toLowerCase()) return true;
        this.router.navigate(['/unauthorized']);
        return false;
      })
    );
  }
}
