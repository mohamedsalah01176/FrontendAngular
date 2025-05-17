import { Component, Input } from '@angular/core';
import { ProductService } from '../../util/services/product.service';
import { Iproduct } from '../../util/interfaces/iproduct';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, CarouselModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
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
    margin: 10
  };

  constructor(
    private productService: ProductService,
    private cookieService: CookieService
  ) {}

  serverURL = 'http://localhost:4000/uploads/'


  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: res => {
        this.productList = res.products;
        this.filteredProductList = [...this.productList];
      },
      error: err => console.error(err)
    });
  }

  filterProducts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProductList = [...this.productList];
    } else {
      this.filteredProductList = this.productList.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  addToCart(product: Iproduct): void {
    console.log(`Added to cart: ${product.title}`);
  }

  toggleWishlist(product: Iproduct): void {
    product.isWachList = !product.isWachList;
    // const token = this.cookieService.get('userToken');
    // this.productService.toggleWishlist(product._id, token).subscribe({
    //   next: res => {},
    //   error: err => console.error(err)
    // });
  }
}
