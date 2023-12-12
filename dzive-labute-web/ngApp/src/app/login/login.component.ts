import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    loginData = {
      username: "",
      password: ""
    };

  constructor(private loginService: LoginService, private router: Router) {}
  
    onSubmit() {
      this.loginService.login(this.loginData).subscribe(
        (res) => {
          const token = res.token

          this.loginService.setAuthToken(token)
          this.loginService.setAuthState()
          this.router.navigate(['/admin']).then(success => {
            if (!success) {
              console.error('Navigation failed')
            }
          })
        },
        (error) => {
          console.error("Login failed:", error)
          alert("Nesprávne meno alebo heslo")
        }
      )
    }
}
