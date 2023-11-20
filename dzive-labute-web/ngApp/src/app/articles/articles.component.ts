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


  deleteArticle(id: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?')
    if (confirmDelete) {
      this.articlesService.deleteArticle(id).subscribe((response) => {
        console.log(response)
        this.articles = this.articles.filter((article: { _id: string; }) => article._id !== id);
        alert("Article successfuly removed")
      }, (error) => {
          alert(error)
      });
    }
  }

  
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
