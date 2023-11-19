import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit{
  constructor(private articlesService: ArticlesService) {}

  articles: any

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((articles) => {
      this.articles = articles
    })
  }
}
