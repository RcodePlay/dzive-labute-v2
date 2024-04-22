import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ArticlesService } from '../services/articles/articles.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  username: string = ''
  articles: any

  constructor(private loginService: LoginService, private router: Router,
     private articleService: ArticlesService, private formsModule: FormsModule) {}


  onLogout() {
    this.loginService.logout()
    this.loginService.notifyLogout()
    this.router.navigate(['/login'])
  }

  ngOnInit():void {
    // this.loginService.isAuthenticatedUser()
    this.lastArticles()
  }


  article = {
    title: '',
    content: '',
    num: ''
  }

  createArticle() {
    this.articleService.createArticle(this.article).subscribe((response) => {
      console.log(response)
      alert("Udalosť vytvorená!")
    })
  }

  lastArticles(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles.slice(0, 2)
    })
  }
}
