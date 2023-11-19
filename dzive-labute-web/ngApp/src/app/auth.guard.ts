import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/login/login.service'; // replace with the actual path to your ApiService

export function AuthGuard(): CanActivateFn {
  return () => {
    const loginService: LoginService = inject(LoginService);
    const router: Router = inject(Router)
    return loginService.isAuthenticatedUser() || router.createUrlTree(['/login'])
  };
}
