import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  username: string = ''

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/login`

    this.username = loginData.username

    // Send the login request to the backend API
    return this.http.post<any>(url, loginData);

  }

  private authToken: string | null = null
  setAuthToken(token: string): void {
    this.cookieService.set('authToken', token)
    this.authToken = token
  }

  getAuthToken(): string | null {
    console.log(this.cookieService.get('authToken'))
    return this.cookieService.get('authToken') 
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

  globalLogout(): void {
    this.checkAuth()
    const url = `${this.apiUrl}/auth/glogout`
    this.http.post(url, {}).subscribe(response => {
      console.log(response)
    })
  }

  checkAuth(): void {
    const url = `${this.apiUrl}/auth/check`
    const headers = {'Authorization': 'Bearer ' + this.getAuthToken()}
    this.http.get(url, { headers }).subscribe(
      response => {
        console.log(response)
    }, (error) => {
      console.error(error)
    })
  }

    // Modified method to include headers in the request
    getProtectedData(): Observable<any> {
      const url = `${this.apiUrl}/api/protected-data`;
      const headers = this.getHeaders();
  
      return this.http.get(url, { headers });
    }
    

    private logoutSubject = new Subject<void>();
    logoutObservable = this.logoutSubject.asObservable()

    notifyLogout() {
      this.logoutSubject.next()
    }

    getUsername() {
      return this.username
    }
}    

