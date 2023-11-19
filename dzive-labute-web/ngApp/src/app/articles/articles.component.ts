import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles/articles.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit{
  constructor(private articlesService: ArticlesService, private loginService: LoginService) {}

  articles: any

  isloggedIn = false

  //maintenance of the deleteArticle method
  //errors with api paths
 /* deleteArticle(id: string) {
    this.articlesService.deleteArticle(id).subscribe((response) => {
      console.log(response);
      // Handle response here
      // You might want to remove the deleted article from your articles array
    });
  } */

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((articles) => {
      this.articles = articles
    })
    this.isloggedIn = false
    if (this.loginService.isAuthenticatedUser()) {
      this.isloggedIn = true
    } else {
      this.isloggedIn = false
    }
  }
}
