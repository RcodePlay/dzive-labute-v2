import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Router } from '@angular/router';


export function AuthGuard(): CanActivateFn /*= (route, state) => */ {

return () => {
    const loginService: LoginService = inject(LoginService);
    const router: Router = inject(Router)
    return loginService.isAuthenticatedUser() || router.createUrlTree(['/login'])
  };
};
