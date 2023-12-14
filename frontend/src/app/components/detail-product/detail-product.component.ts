import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute,Router } from '@angular/router';
import { NgFor,NgIf } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import ConnetData from '../../api.service';
import { Cookie } from '../../cookie';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../user.service';

declare var $: any;
@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule],
  providers: [Cookie,LoginComponent],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})


export class DetailProductComponent implements OnInit {
  products:Product = testValue;
  isbn:string|null = '';
  title:string= '';
  star:number=0;
  token:string = '';
  user:any;
  comments:any;
  checkLogin:boolean = true;
  checkComment:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private Cookie: Cookie,
    private UserService: UserService,
    private router:Router,
    ){}

  async ngOnInit(){

    this.isbn  = this.route.snapshot.queryParamMap.get('isbn');

    this.products = await ConnetData.get('product/:query',{params : {isbn: this.isbn}})
    
    if(!this.products){
      this.router.navigate(['/404-not-found'])
    }
    
    this.comments = await ConnetData.get('comment/:id-product', {params : {_id: this.products._id}})

    this.comments = this.comments.comment
    this.title = this.products.category_id.name
    
    this.token = this.Cookie.getCookie('token')
    if(this.token) {
      this.checkLogin = false
      this.user = this.UserService.getUser()
      
      for (let i = 0; i < this.comments.length; i++) {
        const element = this.comments[i];
        
        if(this.user.id == element.id_user._id){
          this.checkComment = false
          break;
        }
      }
    }else{
      this.checkLogin = true
      this.user = false
      this.checkComment = false
    }

    $(document).on('click', '.choose-star', (e:MouseEvent)=> {
      this.star =  Number($(e.target).attr('data'))
      for (let i = 0; i < this.star; i++) {
        $('.choose-star').eq(i).removeClass('fa-star-o').addClass('fa-star')
      }
      for (let i = this.star; i < 5; i++) {
        $('.choose-star').eq(i).removeClass('fa-star').addClass('fa-star-o')
      }
      this.textStar(this.star)
    });
  }



  async onSubmit(comment:any) {
    let data = {
      content: comment.form.value.comment,
      id_user: this.user.id,
      id_product: this.products._id,
      star: this.star
    }

    this.checkComment = false
    this.products.review_count++

    this.products.average_score = parseFloat((
      (this.products.average_score * (this.products.review_count - 1 ) + data.star) 
        / this.products.review_count).toFixed(2))
    this.products.category_id = this.products.category_id._id

    await ConnetData.post('comment/create', data)    
    await ConnetData.post('product/update-avg', this.products)  
    
    let newComment ={
      content : data.content,
      star:data.star,
      id_user :{
        name: this.user.name,
        image: this.user.image
      }
    }
    this.comments.push(newComment)
  }


  getStar(star:number) {
    let html = ''
    for (let i = 1; i <= star; i++) {
      html+= '<i class="fa fa-star text-yellow-400" aria-hidden="true"></i>'
    }
    if (!Number.isInteger(star)&& star!=0){
      html+= '<i class="fa fa-star-half-o text-yellow-400" aria-hidden="true"></i>'
      star++
    }
    for (let i = star; i <5; i++) {
      html += '<i class="fa fa-star-o text-yellow-400" aria-hidden="true"></i>'
    }
    return html
  }

  countStar(objects: any[] | undefined,targetStar:Number): number {

    if (objects) {
      let filteredObjects = objects.filter(obj => obj.star === targetStar);
      return filteredObjects.length;
    } else {
      return 0;
    }
  }

  percentage(count:number,sum :number){
    let res = ((count / sum) * 100).toFixed(0)
    if(Number(res)){
      return res
    }
    return 0 
  }

  textStar(star:number){
    switch (star) {
      case 1:
        $('.text-star').html('Rất tệ')
        break;
      case 2:
        $('.text-star').html('Tệ')
        break;
      case 3:
        $('.text-star').html('Tạm')
        break;
      case 4:
        $('.text-star').html('Tốt')
        break;
      case 5:
        $('.text-star').html('Rất Tốt')
        break;
      default:
        break;
    }
  }
}


export interface Product {
  _id: object,
  name: string,
  price: number,
  category_id: any,
  info:string,
  average_score:number,
  author:string,
  year: number,
  image:string,
  review_count:number,
  sale:number,
  isbn:string,
}  

const testValue:Product = {
  _id: {},
  name: 'TEST',
  price: 0,
  category_id: 0,
  info: 'test',
  average_score: 0,
  author: 'tác giả',
  year: 2000,
  image: '1701620286699-8935278607311.jpg',
  review_count: 0,
  sale: 0,
  isbn: '999999',
};


export interface Comment {
  _id: object,
  content: String,
  id_user: String,
  id_product: String,
  star:Number
}  