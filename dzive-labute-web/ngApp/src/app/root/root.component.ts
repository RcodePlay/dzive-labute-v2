import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {

  loginData = {
    user: "",
    token: ""
  }

  constructor(private loginService: LoginService, private router: Router) {}

  tokenLogin(): void {
    this.loginService.tokenLogin(this.loginData)
    this.router.navigate(['/admin'])
  }
}
