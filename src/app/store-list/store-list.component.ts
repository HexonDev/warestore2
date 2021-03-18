import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address } from '../model/address';
import { Storage } from '../model/storage';
import { Store } from '../model/store';
import { AddressService } from '../service/address.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  constructor(private storeService: StoreService, private addressService: AddressService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  stores: Store[];
  store: Store;

  addresses: Address[];

  storeDialog: boolean = false;

  loadingSpinner = {
    stores: false,
    addresses: false
  };

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(){
    this.loadingSpinner.stores = true;

    this.storeService.getStores().subscribe(res => {
      this.stores = res
      this.loadingSpinner.stores = false;
    });
  }

  saveStore(){
    if(!this.store.name || !this.store.addressId){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `Minden mező kitöltése kötelező`
      });

      return;
    }

    this.storeService.postStore(this.store).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen létrehoztad a(z) ${this.store.name} nevű áruházat`
      });

      this.loadStores();
      this.hideAddStoreDialog()
    });
  }

  deleteStore(store: Store) {
    this.storeService.deleteStore(store.id).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${store.name} áruházat`
      });

      this.loadStores();
    });
  }

  showAddStoreDialog(){
    this.store = new Store();

    this.loadingSpinner.addresses = true;
    this.storeDialog = true;

    this.addressService.getAddresses().subscribe(res => {
      this.addresses = res;
      this.loadingSpinner.addresses = false;
    })
  }

  hideAddStoreDialog(){
    this.storeDialog = false;
    this.addresses = [];

    this.store = null;
  }

  showDeleteStoreDialog(store: Store){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${store.name} (azonosító: ${store.id}) raktárat?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteStore(store)
    });
  }
}
