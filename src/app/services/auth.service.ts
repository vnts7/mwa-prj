import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key = 'jwt';
  private _user = null;
  constructor() { }
  saveToken(token: string) {
    localStorage.setItem(this.key, token);
  }
  readToken(){
    return localStorage.getItem(this.key);
  }
  get user() {
    if (this._user) return this._user;
    try {
      this._user = jwt_decode(localStorage.getItem(this.key));
    } catch (error) { }
    return this._user;
  }
  logout(){
    localStorage.removeItem(this.key);
    this._user = null;
  }
}
