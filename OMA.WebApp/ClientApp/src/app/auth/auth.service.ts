import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../shared/app-user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    readonly url = environment.baseUrl + "api/";

    constructor(private http: HttpClient) {}

    signUp(appUser: AppUser) {
        return this.http.post(`${this.url}Auth/Register`, appUser);
    }

    login(email: string, password: string) {
        return this.http.post<{token: string}>(`${this.url}Auth/Login`, {email, password});
    }
    forgotPassword(email: string): Observable<any> {
        return this.http.post( this.url + `auth/forgot-password`, {email});
      }
    resetPassword(request: IResetPassword): Observable<any> {
        return this.http.post(`${this.url}auth/reset-password`, request);
      }
      
}
interface IResetPassword {
    Email: string;
    Token: string;
    Password: string;
    ConfirmPassword: string;
  }