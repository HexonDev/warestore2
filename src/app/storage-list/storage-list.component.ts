import { Component, OnInit } from '@angular/core';
import { Storage } from '../model/storage';
import { StorageService } from '../service/storage.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Address } from '../model/address';
import { AddressService } from '../service/address.service';


@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss']
})
export class StorageListComponent implements OnInit {

  constructor(private storageService: StorageService, private addressService: AddressService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  storages: Storage[] = []; // Az összes raktár
  storage: Storage; // Valami raktár (törlésnél és hozzáadásnál is használom? lol)
  selectedStorages: Storage[]; // Kielölt raktárak

  addresses: Address[];

  storageDialog: boolean = false;
  loadingSpinner = {
    storages: false,
    addresses: false
  };
  
  ngOnInit(): void {
    this.loadStorages()
  }

  showAddStorageDialog(){ 
    this.storage = new Storage()
    console.log("MEGNYIT:", this.storage)
    this.loadingSpinner.addresses = true
    this.storageDialog = true // Ezzel nyílik meg 

    this.addressService.getAddresses().subscribe(res => {
      this.addresses = res
      this.loadingSpinner.addresses = false
    })
  }

  hideAddStorageDialog(){ 
    this.storageDialog = false
    this.addresses = []
    
    this.storage = null
  }

  showDeleteStorageDialog(storage: Storage){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${storage.name} (azonosító: ${storage.id}) raktárat?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteStorage(storage)
    })
  }

  loadStorages(){
    this.loadingSpinner.storages = true

    this.storageService.getStorages().subscribe((res) => {
      this.storages = res
      this.loadingSpinner.storages = false
    });
  }

  saveStorage(){
    console.log("SAVE:", this.storage);

    if(!this.storage.name || !this.storage.addressId){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `Minden mező kitöltése kötelező!`
      })
      return
    }

    this.storageService.postStorage(this.storage).subscribe((res) => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen létrehoztad a(z) ${this.storage.name} nevű raktárat`
      })

      this.storages.push(res as Storage)

      this.hideAddStorageDialog()
    })
  }

  deleteStorage(storage: Storage){
    this.storageService.deleteStorage(storage.id).subscribe(() => {
      this.storages.splice(this.storages.indexOf(storage), 1);

      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${storage.name} raktárat`
      })
    })
  }
}
