import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavLinksComponent } from "../nav-links/nav-links.component";


@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule, FormsModule, NavLinksComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products = [
    {
  "sold": "200",
  "_id":"681fa619fbb65b3b78168bf4",
  "title": "Woman Shawl",
  "slug": "woman-shawl",
  "description": "Material: Polyester Blend\nColour Name: Multicolour\nDepartment: Women",
  "quantity": 2,
  "price": 149,
  "imageCover": "https://ecommerce.routemisr.com/Route-Academy-products/1680403156501-cover.jpeg",
  "images": [
    "https://ecommerce.routemisr.com/Route-Academy-products/1680403156555-3.jpeg",
    "https://ecommerce.routemisr.com/Route-Academy-products/1680403156555-2.jpeg",
    "https://ecommerce.routemisr.com/Route-Academy-products/1680403156554-1.jpeg",
    "https://ecommerce.routemisr.com/Route-Academy-products/1680403156556-4.jpeg"
  ],
  "category": {
    "name": "Women's Fashion",
    "slug": "women's-fashion",
    "image": "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg"
  },
  "ratingsAverage": 4.8,
  "ratingsQuantity": 18,
  "adminId": "681158e4c37e876b1f7399ac"
},
    // {
    //   id:2,
    //   name: 'elexy-demo',
    //   color: 'Eampit',
    //   price: 39700,
    //   quantity: 1,
    //   image: '/images/product-1.avif',
    //   total:100
    // },
    // أضف المزيد حسب الحاجة
  ];
  @ViewChildren('ProductTotalPrice') ProductTotalPrice :any;
  coupon:string='';
  error:string=''
  url:string='';
  totalCheckout:number=0
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _Router=inject(Router);

  ngDoCheck(): void {
    this.url=this._ActivatedRoute.snapshot.routeConfig?.path as string  ;
    this.calcCheckout()
  }
  handleProducts(){
    localStorage.setItem("productCart",JSON.stringify(this.products));
    this._Router.navigate(['/checkout'])
  }
  // calcTotal(id:number){
  //   console.log(this.ProductTotalPrice._results)
  //   for(let i =0;i<this.ProductTotalPrice._results.length;i++){
  //     if(this.ProductTotalPrice._results[i].id === id){
  //       console.log(id,"xxxxxxxxx")
  //     }
  //   }
  //   let product=this.products.find(pro=>pro.id == id);
  //   if(product){
  //     // this.ProductTotalPrice.nativeElement.innerHtml=600;
  //   }

  // }
  increaseQounter(id:string){
    let product=this.products.find(pro=>pro._id == id);
    if(product){
      product.quantity++;
      // this.calcTotal(id)
    }
  }
  decreaseQounter(id:string){
    let product=this.products.find(pro=>pro._id === id);
    if(product){
      if(product.quantity>1){
        product.quantity--;
        // this.calcTotal(id)
      }
    }
  }

  deleteProduct(){}

  calcCheckout(){
    this.totalCheckout =this.products.reduce((prev,current)=>prev+(current.price * current.quantity),0);
    return this.totalCheckout
  }
  addCoupon(){
    console.log(this.coupon)
    this.totalCheckout-=500;
    this.calcCheckout()
  }
}
