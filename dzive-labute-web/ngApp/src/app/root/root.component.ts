import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';

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

  constructor(private loginService: LoginService) {}

  private apiUrl = "http://localhost:3000/root"

  tokenLogin(): void {
    this.loginService.tokenLogin(this.loginData)
  }
}
