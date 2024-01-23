import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) { }

  getCookieConsent(): boolean {
    return this.cookieService.get('cookieConsent') === 'true';
  }

  setCookieConsent(value: boolean, days: number) {
    this.cookieService.set('cookieConsent', value.toString(), days);
  }

  setLoginable(value: boolean) {
    this.cookieService.set('loginable', value.toString(), 1)
  }

  isLoginable(): boolean {
    return this.cookieService.get('loginable') === 'false'
  }

}
