import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../util/services/category.service';
import { Icategory } from '../../util/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  CategoryService = inject(CategoryService);
  categoryID: string | null = null;
  categoryList: Icategory[] = [];
  getSpecificProductsub: Subscription = new Subscription();
  ngOnInit(): void {
    this.categoryID = this.route.snapshot.params['id'];
    this.getSpecificProductsub = this.CategoryService.getSpecificCategory(
      this.categoryID
    ).subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },

      error: (err) => {
        console.log('🚀 ~ CategoryDetailsComponent ~ ngOnInit ~ err:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.getSpecificProductsub.unsubscribe();
  }
}
