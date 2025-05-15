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
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {

  Math = Math;
  productList: Iproduct[] = [];
  filteredProductList: Iproduct[] = [];
  selectedImageIndex: { [key: string]: number } = {};


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

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.products;
        this.filteredProductList = [...this.productList];
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
  }

  onSearchChange(): void {
    this.filterProducts();

  }

  changeImage(productId: string, index: number): void {
    this.selectedImageIndex[productId] = index;

  }

  addToCart(product: Iproduct): void {
    console.log(`Added to cart: ${product.title}`);
  }

  toggleWishlist(product: Iproduct): void {
    product.isWachList = !product.isWachList;
     const token = this.cookieService.get('userToken');
    this.productService.toggleWishlist(product._id, token).subscribe({

     next: res => {},

      error: err => console.error(err)
     });
  }
}
