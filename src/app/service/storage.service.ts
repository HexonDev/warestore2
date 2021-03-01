import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Storage } from '../model/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  //#region GET/POST/PATCH/DELETE METODHS
  getStorages(){
    return this.http.get<Storage[]>(`https://localhost:44304/api/storages`);
  }

  getStorage(id: number){
    return this.http.get<Storage>(`https://localhost:44304/api/storages/${id}`);
  }

  getStorageProducts(id: number){
    return this.http.get<Product[]>(`https://localhost:44304/api/storages/${id}/products`);
  }

  postStorage(storage: Storage){
    return this.http.post(`https://localhost:44304/api/storages`, storage);
  }

  postStorageProduct(id: number, product: Product){
    return this.http.post(`https://localhost:44304/api/storages/${id}/products`, product);
  }

  patchStorage(id: number, storage: Storage){
    return this.http.patch(`https://localhost:44304/api/storages/${id}`, storage);
  }

  putStorage(id: number, storage: Storage){
    return this.http.put(`https://localhost:44304/api/storages/${id}`, storage);
  }

  deleteStorage(id: number){
    return this.http.delete(`https://localhost:44304/api/storages/${id}`);
  }
  //#endregion

  
}
