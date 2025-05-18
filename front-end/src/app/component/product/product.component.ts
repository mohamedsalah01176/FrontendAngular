import { Component, inject, Input } from '@angular/core';
import { ProductService } from '../../util/services/product.service';
import { Iproduct } from '../../util/interfaces/iproduct';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../util/services/wishlist.service';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, CarouselModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() productListLength: number = 0;
  productList: Iproduct[] = [];
  filteredProductList: Iproduct[] = [];
  searchQuery: string = '';

  // Owl Carousel Options
  carouselOptions = {
    items: 1,
    dots: true,
    nav: false,
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4000,
    margin: 10,
  };
  private wishlistService = inject(WishlistService);
  private productService = inject(ProductService);
  private cookieService = inject(CookieService);
  private readonly loadData$ = new BehaviorSubject(true);
  wishlistItems = toSignal(this.loadWhishList);

  get loadWhishList() {
    return this.loadData$.pipe(
      switchMap(() =>
        this.wishlistService.loadWishlist().pipe(map((res) => res.wishlist))
      )
    );
  }

  serverURL = 'http://localhost:4000/uploads/';

  randomIndexesOfProducts: number[] = [];

  getRandomIndexesOfProducts(productList: Iproduct[]) {
    this.randomIndexesOfProducts = [];

    let count;
    if (productList.length > 12) {
      if (location.pathname === '/home') {
        count = 12;
      } else {
        count = productList.length;
      }
    } else {
      count = productList.length;
    }

    while (this.randomIndexesOfProducts.length < count) {
      const randomNum = Math.floor(Math.random() * productList.length);
      if (!this.randomIndexesOfProducts.includes(randomNum)) {
        this.randomIndexesOfProducts.push(randomNum);
      }
    }
    console.log(this.randomIndexesOfProducts);
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.products;
        this.filteredProductList = [...this.productList];
        this.getRandomIndexesOfProducts(this.productList);
      },
      error: (err) => console.error(err),
    });
  }

  filterProducts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProductList = [...this.productList];
    } else {
      this.filteredProductList = this.productList.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.getRandomIndexesOfProducts(this.filteredProductList);
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  addToCart(product: Iproduct): void {
    console.log(`Added to cart: ${product.title}`);
  }

  toggleWishlist(id: string): void {
    const action = this.isItemInWhishlist(id)
      ? this.removeFromWhishlist
      : this.addToWhishlist;

    action.call(this, id);
  }

  isItemInWhishlist(id: string) {
    return this.wishlistItems()?.find((item) => item._id === id);
  }

  removeFromWhishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.loadData$.next(true);
      },
      error: (err) => {
        console.error('Error removing item:', err);
      },
    });
  }
  addToWhishlist(productId: string): void {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.loadData$.next(true);
      },
      error: (err) => {
        console.error('Error removing item:', err);
      },
    });
  }
}
