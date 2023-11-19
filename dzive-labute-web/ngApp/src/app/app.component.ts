import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  title = 'ngApp';
  isLoggedIn = false

  ngOnInit() {
    this.isLoggedIn = this.loginService.isAuthenticatedUser()
    this.loginService.logoutObservable.subscribe(() => {
      this.isLoggedIn = false
    })
  }
}
