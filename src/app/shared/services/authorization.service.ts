import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';
  constructor(private http: HttpClient, private router: Router) {}

  authenticate(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { login, password });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN);
    return !!token;
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  logout(): void {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/logout']);
  }
}
