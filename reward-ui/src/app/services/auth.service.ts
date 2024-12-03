// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './auth-response.model';  // Import the response model


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(phone: string, password: string): Observable<AuthResponse> {  // Use AuthResponse here
    return this.http.post<AuthResponse>('http://localhost:3000/api/v1/auth/login', { phone, password }).pipe(
      tap((response: AuthResponse) => {  // Use the typed response here
        // Set authentication status to true on successful login
        this.isAuthenticatedSubject.next(true);
        // Store the token in local storage
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  logout(): void {
    // Set authentication status to false on logout
    this.isAuthenticatedSubject.next(false);
    // Clear the token from local storage
    localStorage.removeItem('authToken');
  }
  // New sign-up method
  signUp(userData: { firstName: string; lastName: string; email: string; password: string; phone: string }): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/signup', userData);
  }

  
}
