import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormsModule } from "@angular/forms";
import { NgFor ,NgIf} from '@angular/common';
import { UserService } from '../../user.service';
import { Cookie } from '../../cookie';
import ConnetData from '../../api.service';
import axios from "axios";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './user.component.html',
  providers: [Cookie],
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{
  user:User = {
    name: 'Name',
    image: 'null-avt.jpg',
    phone: '0999999999',
    email: 'email.com',
    id: '',
    user:'',
    role:0,
  };
  err: string='';
  success: string='';
  admin:boolean = false;
  token:string = ''
  constructor(
    private el: ElementRef, 
    private Cookie: Cookie, 
    private router:Router,
    private UserService: UserService,
    ) {}
  
  async ngOnInit(){
    this.token = this.Cookie.getCookie('token')
    if(!this.token ){
      this.router.navigate(['/login'])
    }
    const options = {
      headers: ({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YourAccessToken',
        'token': this.token ,
      }),
    };
    this.user = await ConnetData.get('user/token', options)
    this.user = this.user.user    
    if(this.user.role == 0){
      this.admin = true
    }
  }

  ngAfterViewInit() {
    const imageInput = this.el.nativeElement.querySelector('#imageInput');
    const previewImage = this.el.nativeElement.querySelector('#previewImage');

    imageInput.addEventListener('change', (event:any) => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const objectURL = URL.createObjectURL(file);

        previewImage.src = objectURL;
        previewImage.style.display = 'block';

        previewImage.onload = () => {
          URL.revokeObjectURL(objectURL);
        };
      } else {
        previewImage.style.display = 'none';
      }
    });
  }


  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit(login:any) {
    let data = login.form.value;

    const formData = new FormData();
    formData.append('_id', data.id);
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    
    if (this.selectedFile) {
      data.image = this.selectedFile.name
      formData.append('image', this.selectedFile);
    }else{
      data.image = data.old_image
      formData.append('image', data.old_image);
    }
    
    // Now you can log or use formData outside the if block
    
    let response = await ConnetData.post('user/update',formData)
    if(response.status == 200) {
      this.user = data
      this.UserService.setUser(data)
      this.success = 'Cập nhật thành công'
    }else{
      this.err = 'Email đã được sử dụng'
    }
  }

  loginAdmin() {
    
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YourAccessToken',
        'token': this.token,
      },
    };
    
    axios.post('http://localhost:3000/admin/login-token',{}, options)
    .then(response => {
      if (response.request.responseURL !== undefined) {
        window.location.href = response.request.responseURL;
      } else {
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  logOut() {
    this.Cookie.deleteCookie('token')
    this.UserService.clearUser()
    this.router.navigate(['/home'])
  }
}

interface User {
  name: string;
  image: string;
  phone: string;
  email: string;
  id: string;
  user:any;
  role:number;
}

