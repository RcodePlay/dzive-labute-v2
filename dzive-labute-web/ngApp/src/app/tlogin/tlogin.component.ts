import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router'
import { CookiesService } from '../services/cookies/cookies.service';


@Component({
  selector: 'app-tlogin',
  templateUrl: './tlogin.component.html',
  styleUrls: ['./tlogin.component.scss']
})
export class TloginComponent {
    loginData = {
      user: "",
      token: ""
    };

  constructor(private loginService: LoginService, private router: Router, private cookiesService: CookiesService) {}
    
    loginAttemptCount = 0


    login() {
      if (this.cookiesService.isLoginable()) {
        alert("Stop it, get some help")
      } else { 
        this.onSubmit()
      }
    }

    onSubmit() {
      this.loginService.tokenLogin(this.loginData).subscribe(
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

          this.cookiesService.setLoginType('token')
        }
      )
    }

    changeLoginType() {
      this.router.navigate(['/login'])
    }
}
