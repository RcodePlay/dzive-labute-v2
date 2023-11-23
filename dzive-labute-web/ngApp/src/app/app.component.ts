import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { OnInit } from '@angular/core';
import { CookiesService } from './services/cookies/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService, private cookieService: CookiesService) {}

  showCookieMessage = false;

  title = 'ngApp';
  isLoggedIn = false

  ngOnInit() {
    this.isLoggedIn = this.loginService.isAuthenticatedUser()
    this.loginService.logoutObservable.subscribe(() => {
      this.isLoggedIn = false
    })
    this.showCookieMessage = !this.cookieService.getCookieConsent();
  }

  acceptCookies() {
    this.cookieService.setCookieConsent(true, 1);
    this.showCookieMessage = false;
  }

  msgSupport() {

  }
}
