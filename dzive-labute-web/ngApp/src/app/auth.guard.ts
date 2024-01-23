import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Router } from '@angular/router';


export const AuthGuard = () => {
  const loginService = inject(LoginService)

  if (loginService.isAuthenticatedUser() == true) {
    return true
  } else {

    const router = inject(Router)

    router.navigateByUrl('/login')
    return false
  }
}