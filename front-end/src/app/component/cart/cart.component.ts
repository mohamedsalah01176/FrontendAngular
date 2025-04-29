import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChildren } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products = [
    {
      id:1,
      name: 'elexy-demo',
      color: 'Eampit',
      price: 39700,
      quantity: 1,
      image: '/images/product-1.avif',
      total:500
    },
    {
      id:2,
      name: 'elexy-demo',
      color: 'Eampit',
      price: 39700,
      quantity: 1,
      image: '/images/product-1.avif',
      total:100
    },
    // أضف المزيد حسب الحاجة
  ];
  @ViewChildren('ProductTotalPrice') ProductTotalPrice :any;
  coupon:string='';
  error:string=''
  url:string='';
  totalCheckout:number=0
  private readonly _ActivatedRoute=inject(ActivatedRoute);

  ngDoCheck(): void {
    this.url=this._ActivatedRoute.snapshot.routeConfig?.path as string  ;
    this.calcCheckout()
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
  increaseQounter(id:number){
    let product=this.products.find(pro=>pro.id == id);
    if(product){
      product.quantity++;
      // this.calcTotal(id)
    }
  }
  decreaseQounter(id:number){
    let product=this.products.find(pro=>pro.id === id);
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
