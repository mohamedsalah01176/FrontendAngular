import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);

  private token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userToken='))
    ?.split('=')[1];

  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`
  );

  getWishlist(): Observable<any> {
    return this.http.get(`http://localhost:4000/wishlist`, {
      headers: this.headers,
    });
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(
      `http://localhost:4000/wishlist/${productId}`,
      {},
      {
        headers: this.headers,
      }
    );
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`http://localhost:4000/wishlist/${productId}`, {
      headers: this.headers,
    });
  }
}
