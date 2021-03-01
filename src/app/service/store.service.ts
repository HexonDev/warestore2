import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../model/store';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getStores(){
    return this.http.get<Store[]>(`https://localhost:44304/api/stores`);
  }

  getStore(id: number){
    return this.http.get<Store>(`https://localhost:44304/api/stores/${id}`);
  }

  getStoreProducts(id: number){
    return this.http.get<Product[]>(`https://localhost:44304/api/stores/${id}/products`);
  }

  postStore(store: Store){
    return this.http.post(`https://localhost:44304/api/stores`, store);
  }

  postStoreProduct(id: number, product: Product){
    return this.http.post(`https://localhost:44304/api/stores/${id}/products`, product);
  }

  patchStore(id: number, store: Store){
    return this.http.patch(`https://localhost:44304/api/stores/${id}`, store);
  }

  deleteStore(id: number){
    return this.http.delete(`https://localhost:44304/api/stores/${id}`);
  }
}
