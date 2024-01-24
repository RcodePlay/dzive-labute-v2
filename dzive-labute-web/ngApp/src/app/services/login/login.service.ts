import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "http://localhost:3000/auth"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  username: string = ''

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/login`

    this.username = loginData.username

    // Send the login request to the backend API
    return this.http.post<any>(url, loginData);

  }

  tokenLogin(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/tokenlogin`


    return this.http.post<any>(url, loginData)
  }

  private authToken: string | null = null
  setAuthToken(token: string): void {
    this.cookieService.set('authToken', token)
    this.authToken = token
  }

  getAuthToken(): string | null {
    return this.cookieService.get('authToken') 
  }

  // Modified method to include JWT in the Authorization header
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ` ${token}`
    });
  }


  isAuthenticatedUser(): boolean {
    const url = `${this.apiUrl}/check`
    const headers = this.getHeaders()
    this.http.get(url, { headers }).subscribe(
      response => {
        console.log(response)
      }, (error) => {
        this.clearAuthToken()
        console.error(error)
      })
      return this.cookieService.check('authToken')
  }

  logout(): void {
    const url = `${this.apiUrl}/logout`
    const headers = this.getHeaders()
    this.clearAuthToken()
    
    this.http.get(url, { headers }).subscribe(
      res => {
        console.log(res)
      }, (error) => {
        console.log(error)
      }
    )
    this.notifyLogout()
  }

    private logoutSubject = new Subject<void>();
    logoutObservable = this.logoutSubject.asObservable()

    notifyLogout() {
      this.logoutSubject.next()
    }

    getUsername() {
      return this.username
    }

    clearAuthToken() {
      this.cookieService.delete('authToken')
    }
}    

