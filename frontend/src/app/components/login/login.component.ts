import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormsModule } from "@angular/forms";
import { NgFor } from '@angular/common';
import ConnetData from '../../api.service';
import { Cookie } from '../../cookie';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './login.component.html',
  providers: [Cookie],
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  err:string = '';
  token:string = '';
  public user:any
  constructor(private Cookie: Cookie, private router:Router,private UserService: UserService){}

  async ngOnInit(){
    let token = this.Cookie.getCookie('token')
    if(token){
      this.router.navigate(['/'])
    }
  }

  async onSubmit(login:any) {
    let data = login.form.value
    let response = await ConnetData.post('user/login',data)
    
    try {
      if(response.status == 200){
        const expirationTime = new Date(new Date().getTime() + 6 * 60 * 2000);
        
        this.Cookie.setCookie('token',response.data.token, expirationTime)

        const options = {
          headers: ({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YourAccessToken',
            'token': response.data.token,
          }),
        };
        let payload = await ConnetData.get('user/token', options)
        
        this.UserService.setUser(payload)
        
        this.router.navigate(['/user']);
      }else{
        this.err = response.data.message
      }
    } catch (error) {
      this.router.navigate(['/404-not-found'])
    }
    
  }

}
