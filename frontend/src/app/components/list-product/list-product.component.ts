import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NgFor } from '@angular/common';
import ConnetData from '../../api.service';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {
  title:string = ''
  queryParam: string = '';
  idParam: string = '';
  search: string ='';
  products: any;
  categories:any

  constructor(private route: ActivatedRoute,private router:Router) { }

  async ngOnInit(){
    this.categories = await ConnetData.get('category')
    this.route.queryParams.subscribe(async params => {
      this.queryParam = params['query'] ;

      if(this.queryParam == 'category'){
        this.idParam =  params['id'] ;
        this.products = await ConnetData.get('product/:query',{params : {category_id: this.idParam}})

        for (let index = 0; index < this.categories.length; index++) {
          const element = this.categories[index];
          
          if(element._id == params['id']){
            this.title = element.name ;
          }
        }
      }else if(params['search']){
        this.search  = this.title = params['search'];
        this.products = await ConnetData.get('product/:query',{params: {search: this.search}})
      }
    
      console.log(this.products);
      
      if(!this.products){
        this.router.navigate(['/404-not-found'])
      }
    });

  }
}