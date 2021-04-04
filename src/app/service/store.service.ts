import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../model/store';
import { Product } from '../model/product';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getStores(){
    return this.http.get<Store[]>(`${config.apiUrl}/stores`);
  }

  getStore(id: number){
    return this.http.get<Store>(`${config.apiUrl}/stores/${id}`);
  }

  getStoreProducts(id: number){
    return this.http.get<Product[]>(`${config.apiUrl}/stores/${id}/products`);
  }

  postStore(store: Store){
    return this.http.post(`${config.apiUrl}/stores`, store);
  }

  postStoreProduct(id: number, product: Product){
    return this.http.post(`${config.apiUrl}/stores/${id}/products`, product);
  }

  patchStore(id: number, store: Store){
    return this.http.patch(`${config.apiUrl}/stores/${id}`, store);
  }

  putStore(id: number, store: Store){
    return this.http.put(`${config.apiUrl}/stores/${id}`, store);
  }

  deleteStore(id: number){
    return this.http.delete(`${config.apiUrl}/stores/${id}`);
  }
}
