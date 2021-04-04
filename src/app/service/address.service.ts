import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../model/address';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddresses(){
    return this.http.get<Address[]>(`${config.apiUrl}/addresses`);
  }

  getAddress(id: number){
    return this.http.get<Address>(`${config.apiUrl}/addresses/${id}`);
  }

  postAddress(address: Address){
    return this.http.post(`${config.apiUrl}/addresses`, address);
  }

  patchAddress(id: number, address: Address){
    return this.http.patch(`${config.apiUrl}/addresses/${id}`, address);
  }

  putAddress(id: number, address: Address){
    return this.http.put(`${config.apiUrl}/addresses/${id}`, address);
  }

  deleteAddress(id: number){
    return this.http.delete(`${config.apiUrl}/addresses/${id}`);
  }
}
