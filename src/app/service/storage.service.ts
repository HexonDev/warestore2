import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Storage } from '../model/storage';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  //#region GET/POST/PATCH/DELETE METODHS
  getStorages(){
    return this.http.get<Storage[]>(`${config.apiUrl}/storages`);
  }

  getStorage(id: number){
    return this.http.get<Storage>(`${config.apiUrl}/storages/${id}`);
  }

  getStorageProducts(id: number){
    return this.http.get<Product[]>(`${config.apiUrl}/storages/${id}/products`);
  }

  postStorage(storage: Storage){
    return this.http.post(`${config.apiUrl}/storages`, storage);
  }

  postStorageProduct(id: number, product: Product){
    return this.http.post(`${config.apiUrl}/storages/${id}/products`, product);
  }

  patchStorage(id: number, storage: Storage){
    return this.http.patch(`${config.apiUrl}/storages/${id}`, storage);
  }

  putStorage(id: number, storage: Storage){
    return this.http.put(`${config.apiUrl}/storages/${id}`, storage);
  }

  deleteStorage(id: number){
    return this.http.delete(`${config.apiUrl}/storages/${id}`);
  }
  //#endregion

  
}
