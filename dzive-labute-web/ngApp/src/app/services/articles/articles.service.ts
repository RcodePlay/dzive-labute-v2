import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    const url = `${this.apiUrl}/api/articles`
    //send the articles get request to he backend
    return this.http.get(url)
  }

  createArticle(article: any): Observable<any> {
    const url = `${this.apiUrl}/api/newarticle`
    return this.http.post(url, article)
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/articles/${id}`)
  }
}
