import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import ConnetData from '../../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  categories: any
  products:any
  sale: any
  constructor() {

  }

  async ngOnInit() {
    this.categories = await ConnetData.get('category')
    this.products = await ConnetData.get('product')
    this.sale = this.products.slice(0, 5);
  }

}
