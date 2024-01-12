import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = 'AIzaSyA7Fw4lxgSLosgO4YXBvKOoNA43l9Lz0yI';
  private authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.authUrl,
      {
        email,
        password,
        returnSecureToken: true
      });
  }
}
