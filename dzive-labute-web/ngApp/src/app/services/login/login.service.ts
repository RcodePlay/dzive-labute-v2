import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { CookiesService } from '../cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "http://localhost:3000/auth"

  constructor(private http: HttpClient, private cookieService: CookieService, private cookiesService: CookiesService) { }

  username: string = ''

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/login`

    this.cookiesService.setLoginType('pass')
    this.username = loginData.username

    // Send the login request to the backend API
    return this.http.post<any>(url, loginData);

  }

  tokenLogin(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/tokenlogin`

    this.cookiesService.setLoginType('token')

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

  getAuthTokenBool(): boolean {
    if (this.getAuthToken() == this.authToken) {
      return true
    } else {
      return false
    }
  }


  // Modified method to include JWT in the Authorization header
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    const loginType = this.cookiesService.getLoginType()
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ` ${token}`,
      'Login-Type': ` ${loginType}`
    });
  }

  isAuthenticatedUser(): boolean {
    const url = `${this.apiUrl}/check`
    const headers = this.getHeaders()
    this.http.get(url, { headers }).subscribe(
      response => {
        console.log(response)
      }, (error) => {
        console.error(error)
      })
      return this.cookieService.check('authToken')
  }

  logout(): void {
    const url = `${this.apiUrl}/logout`
    const headers = this.getHeaders()
    this.http.get(url, { headers }).subscribe(
      res => {
        console.log(res)
      }, (error) => {
        console.log(error)
      }
    )
  }

  globalLogout(): void {
    this.checkAuth()
    const url = `${this.apiUrl}/glogout`
    const headers = this.getHeaders()
    this.http.get(url, { headers }).subscribe(response => {
      console.log(response)
    })
  }

  checkAuth(): void {
    const url = `${this.apiUrl}/check`
    const headers = this.getHeaders()
    this.http.get(url, { headers }).subscribe(
      response => {
        console.log(response)
    }, (error) => {
      console.error(error)
    })
  }

    // Modified method to include headers in the request
    getProtectedData(): Observable<any> {
      const url = `${this.apiUrl}/protected-data`;
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

