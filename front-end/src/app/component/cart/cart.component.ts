import { Router } from '@angular/router';
import { CartService } from '../../util/services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  url: string = ''; 
  products: any[] = [];
  coupon: string = '';
  error: string = '';
  totalCheckout: number = 0;
  token: string = 'YOUR_USER_TOKEN'; 

  constructor(
    private cartService: CartService,   
    private _ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart(this.token).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.products = response.cart.products;
          this.calcCheckout();
        }
      },
      (error) => {
        console.error('Failed to load cart:', error);
      }
    );
  }

  increaseQounter(id: string) {
    this.updateQuantity(id, this.products.find(p => p.productId === id)?.quantity + 1);
  }

  decreaseQounter(id: string) {
    this.updateQuantity(id, this.products.find(p => p.productId === id)?.quantity - 1);
  }

  updateQuantity(id: string, quantity: number) {
    this.cartService.updateQuantity(id, quantity, this.token).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.loadCart();
        }
      },
      (error) => {
        console.error('Failed to update quantity:', error);
      }
    );
  }

  deleteProduct(id: string) {
    this.cartService.removeProduct(id, this.token).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.loadCart();
        }
      },
      (error) => {
        console.error('Failed to remove product:', error);
      }
    );
  }

  calcCheckout() {
    this.totalCheckout = this.products.reduce(
      (prev, current) => prev + current.productId.price * current.quantity,
      0
    );
  }

  addCoupon() {
    this.totalCheckout -= 500;
    this.calcCheckout();
  }

  clearCart() {
    this.cartService.clearCart(this.token).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.products = [];
          this.calcCheckout();
        }
      },
      (error) => {
        console.error('Failed to clear cart:', error);
      }
    );
  }
}
