import { Component, OnInit } from '@angular/core';
import { Cookie } from '../cookie';
import { NgIf } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  providers: [Cookie],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  checkLogin:boolean = false
  user:any 
  constructor(private Cookie:Cookie,private UserService:UserService){}

  async ngOnInit(){

    let token = this.Cookie.getCookie('token')
    
    if(token) {
      this.checkLogin = true
      this.user = this.UserService.getUser()
    }
    
  }
}
