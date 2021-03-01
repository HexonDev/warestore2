import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address } from '../model/address';
import { Product } from '../model/product';
import { Store } from '../model/store';
import { AddressService } from '../service/address.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private storeService: StoreService, private addressService: AddressService, private route: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  store: Store;
  storeData: any[];

  product: Product;
  products: Product[];

  addresses: Address[];

  loadingSpinner = {
    store: false,
    addresses: false
  };

  dialogs = {
    edit: false,
    product: false
  };

  ngOnInit(): void {
    this.loadingSpinner.store = true;

    this.route.params.subscribe(params => {
      this.storeService.getStore(params.id).subscribe(res => {
        this.store = res;

        this.storeData = [
          { dataName: "Azonosító", dataValue: this.store.id },
          { dataName: "Név", dataValue: this.store.name },
          { dataName: "Cím", dataValue: this.store.address.addressString },
          { dataName: "Termékek száma", dataValue: this.store.stock.length == 0 ? "Nincs termék a raktárban (0)" : this.store.stock.length }
        ];

        this.loadProducts();

        this.checkLoadingStatus();
      });
    });
  }

  loadProducts(){
    this.storeService.getStoreProducts(this.store.id).subscribe(res => {
      this.products = res;
      this.checkLoadingStatus();
    });
  }

  checkLoadingStatus(){
    this.loadingSpinner.store = !this.store && !this.products ;
  }


}
