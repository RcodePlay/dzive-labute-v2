import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ArticlesService } from '../services/articles/articles.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  username: string = ''

  constructor(private loginService: LoginService, private router: Router,
     private articleService: ArticlesService) {}


  onLogout() {
    this.loginService.logout()
    this.loginService.notifyLogout()
    this.router.navigate(['/login'])
  }

  ngOnInit():void {
    this.loginService.checkAuth()
  }



  article = {
    title: '',
    content: '',
    author: ''
  }

  createArticle() {
    if (this.loginService.isAuthenticatedUser()) {

    
    this.articleService.createArticle(this.article).subscribe((response) => {
      console.log(response)
      alert("Článok vytvorený!")
    })
  }
  }
}
