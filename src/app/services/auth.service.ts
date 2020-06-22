import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean = false;

  constructor() { }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout() {
    this.authenticated = false;
  }

  authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'admin') {
        this.authenticated = true;
        resolve();
      } else {
        reject('Wrong password or username');
      }
    })
  }
}
