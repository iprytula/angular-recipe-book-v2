import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from '../interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = 'AIzaSyA7Fw4lxgSLosgO4YXBvKOoNA43l9Lz0yI';
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ this.apiKey }`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ this.apiKey }`;

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>(
      this.signInUrl,
      {
        email,
        password,
        returnSecureToken: true
      });
  }

  signUp(email: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>(
      this.signUpUrl,
      {
        email,
        password,
        returnSecureToken: true
      });
  }
}
