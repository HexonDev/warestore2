import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(`https://localhost:44304/api/products`);
  }

  getProduct(id: number){
    return this.http.get<Product>(`https://localhost:44304/api/products/${id}`);
  }

  postProduct(product: Product){
    return this.http.post(`https://localhost:44304/api/products`, product);
  }

  patchProduct(id: number, product: Product){
    return this.http.patch(`https://localhost:44304/api/products/${id}`, product);
  }

  putProduct(id: number, product: Product){
    return this.http.put(`https://localhost:44304/api/products/${id}`, product);
  }

  deleteProduct(id: number){
    return this.http.delete(`https://localhost:44304/api/products/${id}`);
  }
}
