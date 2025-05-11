import { ProductService } from './../../util/services/dashboard.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Iproduct } from '../../util/interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.css',
})
export class ProductsDashboardComponent {
  productList: Iproduct[] = [];
  constructor(
    private ProductService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ProductService.getAllAdminProducts().subscribe({
      next: (res) => {
        this.productList = res.products;
      },
      error: (err) => console.error(err),
    });
  }
  deleteProduct(id: string) {
    this.ProductService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.productList = this.productList.filter(
          (product) => product._id !== id
        );
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  newProduct = {
    title: '',
    description: '',
    quantity: '',
    price: '',
    imageCover: '',
    category: { name: '' },
  };

  isPopupVisible = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  addProduct() {
    this.ProductService.addProduct(this.newProduct).subscribe({
      next: (res) => {
        this.productList.push(res.data);
        this.isPopupVisible = false;
        this.cdr.detectChanges();
        this.newProduct = {
          title: '',
          description: '',
          quantity: '',
          price: '',
          imageCover: '',
          category: { name: '' },
        };
      },
      error: (err) => console.error(err),
    });
  }

  isPopupForEdit = false;

  productToEdit: Iproduct = {
    _id: '',
    id: '',
    slug: '',
    title: '',
    description: '',
    quantity: 0,
    price: 0,
    imageCover: '',
    category: { _id: '', name: '', slug: '', image: '' },
    sold: 0,
    images: [],
    subcategory: [],
    ratingsQuantity: 0,
    ratingsAverage: 0,
    brand: { _id: '', name: '', slug: '', image: '' },
    createdAt: '',
    updatedAt: '',
  };

  getProductById(id: string) {
    this.ProductService.getproductById(id).subscribe({
      next: (res) => {
        this.productToEdit = res.product[0];
        this.isPopupForEdit = true;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  openPopupForEdit(id: string) {
    this.getProductById(id);
  }

  closePopupForEdit() {
    this.isPopupForEdit = false;
  }

  editProduct() {
    this.ProductService.updateProduct(
      this.productToEdit._id,
      this.productToEdit
    ).subscribe({
      next: (res) => {
        this.productList = this.productList.map((product) =>
          product._id === this.productToEdit._id ? res.product : product
        );
        this.isPopupForEdit = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }
}
