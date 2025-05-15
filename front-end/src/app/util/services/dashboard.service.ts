import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getToken() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('userToken='))
          ?.split('=')[1]
      }`
    );
  }

  getAllAdminProducts(): Observable<any> {
    return this.http.get(`http://localhost:4000/api/dashboard`, {
      headers: this.getToken(),
    });
  }

  getproductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:4000/api/product/${id}`, {
      headers: this.getToken(),
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`http://localhost:4000/api/product/${id}`, {
      headers: this.getToken(),
    });
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(
      `http://localhost:4000/api/product`,
      {
        ...product,
        sold: 0,
        imageCover: 'https://placehold.co/80?text=Product',
        images: [
          `https://placehold.co/300?text=${product.category.name} Product Image 1`,
          `https://placehold.co/300?text=${product.category.name} Product Image 2`,
          `https://placehold.co/300?text=${product.category.name} Product Image 3`,
          `https://placehold.co/300?text=${product.category.name} Product Image 4`,
        ],
      },
      {
        headers: this.getToken(),
      }
    );
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.patch(
      `http://localhost:4000/api/product/${id}`,
      { ...product },
      {
        headers: this.getToken(),
      }
    );
  }
}
