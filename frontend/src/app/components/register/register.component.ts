import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormsModule } from "@angular/forms";
import { NgFor } from '@angular/common';
import ConnetData from '../../api.service';
import { Cookie } from '../../cookie';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './register.component.html',
  providers: [Cookie],
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  err:string = '';
  public user:any
  constructor(private Cookie: Cookie, private router:Router,private UserService: UserService){}

  async ngOnInit(){
    let token = this.Cookie.getCookie('token')
    if(token){
      this.router.navigate(['/'])
    }
  }

  async onSubmit(regiser:any) {
    let data = regiser.form.value
    let response = await ConnetData.post('user/register',data)
    
    if(response.status == 201){
      this.router.navigate(['/login']);
    }else{
      this.err = response.data.message
    }

  }
}
