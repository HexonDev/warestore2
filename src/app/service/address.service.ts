import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddresses(){
    return this.http.get<Address[]>(`https://localhost:44304/api/addresses`);
  }

  getAddress(id: number){
    return this.http.get<Address>(`https://localhost:44304/api/addresses/${id}`);
  }

  postAddress(address: Address){
    return this.http.post(`https://localhost:44304/api/addresses`, address);
  }

  patchAddress(id: number, address: Address){
    return this.http.patch(`https://localhost:44304/api/addresses/${id}`, address);
  }

  deleteAddress(id: number){
    return this.http.delete(`https://localhost:44304/api/addresses/${id}`);
  }
}
