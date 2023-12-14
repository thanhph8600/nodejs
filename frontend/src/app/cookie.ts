import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-example',
  template: ``,
})

export class Cookie {

  constructor(private cookieService: CookieService) {}

  setCookie(key:string ,value:string, time:any):void {
    this.cookieService.set(key, value, time , '/', 'localhost', false, "Lax");
  }

  getCookie(key:string ):string {
    const cookieValue = this.cookieService.get(key);
    return cookieValue
  }

  deleteCookie(key:string ):void {
    this.cookieService.delete(key);
  }
}