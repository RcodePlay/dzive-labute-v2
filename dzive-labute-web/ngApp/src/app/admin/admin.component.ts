import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ArticlesService } from '../services/articles/articles.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  implements OnInit {

  username: string = ''

  constructor(private loginService: LoginService, private router: Router,
     private articleService: ArticlesService, private cookieService: CookieService) {}


  onLogout() {
    this.loginService.logout()
    this.loginService.notifyLogout()
    this.router.navigate(['/login'])
  }

  ngOnInit():void {
    this.checkRootPermissions()
  }



  article = {
    title: '',
    content: '',
    author: ''
  }

  createArticle() {
    this.articleService.createArticle(this.article).subscribe((response) => {
      console.log(response)
      alert("Článok vytvorený!")
    })
  }

  isRoot = false
  pin: string = ''
  rootPin: string = 'root-pin'

  checkRootPermissions() {
    if (this.pin == this.rootPin) {
      return this.isRoot = true
    } else {
      return this.isRoot = false
    }
  }

  globalLogout() {
    if (this.isRoot == true) {
      this.loginService.globalLogout()
    }
  }
}
