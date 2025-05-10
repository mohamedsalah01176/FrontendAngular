import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this.http.get(`http://localhost:4000/api/products`);
  }
  getSpecificProduct(id: string): Observable<any> {
    return this.http.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  // toggleWishlist(productId: string, token: string) {
  //   return this.http.post('https://api.example.com/wishlist',{ productId },{
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   );
  // }
  
}
