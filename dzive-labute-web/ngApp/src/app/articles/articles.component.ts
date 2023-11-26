import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles/articles.service';
import { LoginService } from '../services/login/login.service';
import { Article } from '../services/articles/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit{
  constructor(private articlesService: ArticlesService, private loginService: LoginService) {}

  isloggedIn = false

  selectedArticle: Article = {
    _id: '',
    title: '',
    content: '',
    author: ''
  }

  articles: any
  editing = false

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

  getArticle(id: string) {
    this.articlesService.getArticle(id).subscribe({
      next: (article: Article) => {
        this.selectedArticle._id = article._id
        this.selectedArticle.title = article.title
        this.selectedArticle.content = article.content
      }, 
      error: (error) => {
        console.error(error)
      }
    })
  }

  editArticle(id: string) {
    this.selectedArticle._id = id
    if (!this.editing) {
      this.editing = true
    } else {
      this.editing = false
    }
  }

  updateArticle() {
    if (!this.editing) {
      console.error('No article is currently being edited.');
      return;
    }
  
    this.articlesService.updateArticle(this.selectedArticle._id, this.selectedArticle).subscribe(
      (updatedArticle: Article) => {
  
        const index = this.articles.findIndex((article: Article) => article._id === updatedArticle._id);
        this.articles[index] = updatedArticle;
        this.editing = false;
      }, (error) => {
        console.error(error)
      }
    )
  }
}