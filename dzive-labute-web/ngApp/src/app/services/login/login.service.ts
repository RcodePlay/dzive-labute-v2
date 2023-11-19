import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/api/login`
    // Send the login request to the backend API
    return this.http.post<any>(url, loginData);

  }

  private authToken: string | null = null
  setAuthToken(token: string): void {
    this.cookieService.set('authToken', token)
    this.authToken = token
  }

  getAuthToken(): string | null {
    return this.cookieService.get('authToken');
  }

  // Modified method to include JWT in the Authorization header
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  isAuthenticatedUser(): boolean {
    return this.cookieService.check('authToken');
  }

  logout(): void {
    this.cookieService.delete('authToken')
  }

    // Modified method to include headers in the request
    getProtectedData(): Observable<any> {
      const url = `${this.apiUrl}/api/protected-data`;
      const headers = this.getHeaders();
  
      return this.http.get(url, { headers });
    }
}

