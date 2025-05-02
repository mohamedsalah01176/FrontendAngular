import {
  Component,
  inject,
  Input,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { Iproduct } from '../../util/interfaces/iproduct';
import { ProductService } from '../../util/services/product.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnDestroy {
  ProductService = inject(ProductService);
  productList: Iproduct[] = [];
  @Input() productListLength: number = 0;
  getAllProductsSub: Subscription = new Subscription();
  ngOnInit(): void {
    this.getAllProductsSub = this.ProductService.getAllProducts().subscribe({
      next: (res) => {
        console.log(
          '🚀 ~ ProductComponent ~ this.ProductService.getAllProducts ~ res:',
          res.data
        );
        this.productList = res.data;
      },
      error: (error) => {
        console.log(
          '🚀 ~ ProductComponent ~ this.ProductService.getAllProducts ~ error:',
          error
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();
  }
}
