import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:4000/api/cart'; 

  constructor(private http: HttpClient) {}

addToCart(productId: string, token: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/add`, { productId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

  getCart(token: string): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateQuantity(productId: string, quantity: number, token: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${productId}`, { quantity }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  removeProduct(productId: string, token: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  clearCart(token: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/clear`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
