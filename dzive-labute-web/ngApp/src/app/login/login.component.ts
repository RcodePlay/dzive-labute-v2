import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router'
import { CookiesService } from '../services/cookies/cookies.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private loginService: LoginService, private router: Router, 
    private cookiesService: CookiesService, private formsModule: FormsModule) {}
    
    loginAttemptCount = 0


    login() {
      if (this.cookiesService.isLoginable()) {
        alert("Stop it, get some help")
      } else {
        this.onSubmit()
      }
    }

    onSubmit() {
      this.loginService.login(this.loginData).subscribe(
        (res) => {
          const token = res.token

          this.loginService.setAuthToken(token)
          this.router.navigate(['/admin']).then(success => {
            if (!success) {
              console.error('Navigation failed')
            }
          })
        },
        (error) => {
          console.error("Login failed:", error)
          alert("Nesprávne meno alebo heslo")
          this.loginAttemptCount++

          if (this.loginAttemptCount > 5 ) {
            this.cookiesService.setLoginable(false)
          } else {
            this.cookiesService.setLoginable(true)
          }

          console.log(this.loginAttemptCount)

        }
      )
    }

    changeLoginType() {
      this.router.navigate(['/token'])
    }
}
