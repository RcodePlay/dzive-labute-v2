import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { ArticlesService } from '../services/articles/articles.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private articleService: ArticlesService) {}

  onLogout() {
    this.loginService.logout()
    this.router.navigate(['/login'])
  }

  articles: any

  ngOnInit():void {
    this.articleService.getArticles().subscribe((articles) => {
      console.log('articles', articles)
      this.articles = articles
    })
  }

}
