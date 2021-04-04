import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(`${config.apiUrl}/products`);
  }

  getProduct(id: number){
    return this.http.get<Product>(`${config.apiUrl}/products/${id}`);
  }

  postProduct(product: Product){
    return this.http.post(`${config.apiUrl}/products`, product);
  }

  patchProduct(id: number, product: Product){
    return this.http.patch(`${config.apiUrl}/products/${id}`, product);
  }

  putProduct(id: number, product: Product){
    return this.http.put(`${config.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number){
    return this.http.delete(`${config.apiUrl}/products/${id}`);
  }
}
