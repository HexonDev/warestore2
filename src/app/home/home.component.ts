import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { Storage } from '../model/storage';
import { Store } from '../model/store';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storageService: StorageService, private storeService: StoreService) { }

  storages: Storage[];
  stores: Store[];

  storageProductCount: number = 0;
  storeProductCount: number = 0;

  loadHome: boolean;

  ngOnInit(): void {
    this.loadHome = true;

    this.storageService.getStorages().subscribe(res => {
      this.storages = res;
      this.countProducts();
    });
    
    this.storeService.getStores().subscribe(res => {
      this.stores = res;
      this.countProducts();
    });
  }

  countProducts(){
    if(this.storages){
      this.storages.forEach(storage => {
        this.storageProductCount += storage.products.length;
      });
      
      this.loadHome = false;
    }

    if(this.stores){
      this.stores.forEach(store => {
        this.storeProductCount += store.stock.length;
      });

      this.loadHome = false;
    }
  }
}
