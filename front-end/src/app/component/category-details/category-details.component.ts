import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../../util/services/category.service';
import { Icategory } from '../../util/interfaces/icategory';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../util/interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-details',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  CategoryService = inject(CategoryService);
  categoryID: string | null = null;
  categoryList: any[] = [];

  getSpecificProductsub: Subscription = new Subscription();
  selectedImageIndex: { [key: string]: number } = {};
  ngOnInit(): void {
    this.categoryID = this.route.snapshot.params['id'];
    this.getSpecificProductsub = this.CategoryService.getSpecificCategory(
      this.categoryID
    ).subscribe({
      next: (res) => {
        this.categoryList = res.category;
      },

      error: (err) => {
        console.log('🚀 ~ CategoryDetailsComponent ~ ngOnInit ~ err:', err);
      },
    });
  }
  changeImage(productId: string, index: number): void {
    this.selectedImageIndex[productId] = index;
  }

  addToCart(product: Iproduct): void {
    console.log(`Added to cart: ${product.title}`);
  }

  toggleWishlist(product: Iproduct): void {
    product.isWachList = !product.isWachList;
    // const token = this.cookieService.get('userToken');
    // this.productService.toggleWishlist(product._id, token).subscribe({
    //   next: res => { }
    //   error: err => console.error(err)
    // });
  }

  ngOnDestroy(): void {
    this.getSpecificProductsub.unsubscribe();
  }
}
