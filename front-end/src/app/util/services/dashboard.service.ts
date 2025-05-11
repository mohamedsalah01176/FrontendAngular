import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userToken='))
    ?.split('=')[1];

  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  getAllAdminProducts(): Observable<any> {
    return this.http.get(`http://localhost:4000/api/dashboard`, {
      headers: this.headers,
    });
  }

  getproductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:4000/api/product/${id}`, {
      headers: this.headers,
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`http://localhost:4000/api/product/${id}`, {
      headers: this.headers,
    });
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(
      `http://localhost:4000/api/product`,
      {
        ...product,
        sold: 0,
        imageCover: 'https://placehold.co/80?text=Product',
      },
      {
        headers: this.headers,
      }
    );
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.patch(
      `http://localhost:4000/api/product/${id}`,
      { ...product },
      {
        headers: this.headers,
      }
    );
  }
}
