import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles/articles.service';

@Component({
  selector: 'app-subpage-content',
  templateUrl: './subpage-content.component.html',
  styleUrls: ['./subpage-content.component.scss']
})
export class SubpageContentComponent {
  isHome: boolean = false
  isContact: boolean = false

  constructor(private route: ActivatedRoute, private articleService: ArticlesService) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.isHome = segments[0]?.path === 'home';
      this.isContact = segments[0]?.path === 'contact';
    });
    if (this.isHome) {
      this.getArticle()
    }
  }

  articles: any

  getArticle() {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles
    })
  }


  msgToMessenger() {
    window.open('https://m.me/dzivelabutewebsupport', '_blank');
  }
}
