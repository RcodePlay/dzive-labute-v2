import { Component, Renderer2 } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { OnInit } from '@angular/core';
import { CookiesService } from './services/cookies/cookies.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService,private cookieService: CookieService, private cookiesService: CookiesService, private renderer: Renderer2) {}

  showCookieMessage = false;

  title = 'ngApp';
  isLoggedIn = false

  ngOnInit() {
    this.isDark = this.cookieService.get('isDark') === 'true'
    this.updateBackground()
    
    this.isLoggedIn = this.loginService.isAuthenticatedUser()
    this.loginService.logoutObservable.subscribe(() => {
      this.isLoggedIn = false
    })
    this.showCookieMessage = !this.cookiesService.getCookieConsent();
  }

  acceptCookies() {
    this.cookiesService.setCookieConsent(true, 1);
    this.showCookieMessage = false;
  }


  
  isDark = false

  toggleBackground() {
    this.isDark = !this.isDark
    this.cookieService.set('isDark', String(this.isDark))
    this.updateBackground()
  }

  updateBackground() {
    const color = this.isDark ? '#1b1a19' : '#FFFFFF'
    this.renderer.setStyle(document.body, 'background-color', color)
  }
}
