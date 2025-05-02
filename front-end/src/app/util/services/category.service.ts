import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAllCategories(): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  getSpecificCategory(id: string): Observable<any> {
    return this.http.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
  }
}
