// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: any;

  setUser(user: any): void {
    this.currentUser = user;
    console.log(user);
    
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  getUser(): any {
    const storedUser = localStorage.getItem('currentUser');
    
    let user = storedUser ? JSON.parse(storedUser) : null;
    
    return user.user
  }

  clearUser(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}