import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address, validateAddress } from '../model/address';
import { Storage } from '../model/storage';
import { Store } from '../model/store';
import { ValidationResult } from '../model/validationresult';
import { AddressService } from '../service/address.service';
import { StorageService } from '../service/storage.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address: Address;
  addressData: any[];

  attachedTo: Array<Storage | Store>;

  loadingSpinner = {
    address: false
  };

  dialogs = {
    edit: false
  };

  constructor(private addressService: AddressService, private storageService: StorageService, private storeService: StoreService, private route: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void { 
    this.loadingSpinner.address = true;

    this.route.params.subscribe(params => {
      this.addressService.getAddress(params.id).subscribe(res => {
        this.address = res;

        this.addressData = [
          { dataName: "Azonosító", dataValue: this.address.id },
          { dataName: "Cím rövid neve", dataValue: this.address.shortName },
          { dataName: "Ország", dataValue: this.address.country },
          { dataName: "Irányítószám", dataValue: this.address.zipCode },
          { dataName: "Város", dataValue: this.address.city },
          { dataName: "Közterület neve", dataValue: this.address.name },
          { dataName: "Közterület jelllege", dataValue: this.address.type },
          { dataName: "Házszám", dataValue: this.address.number },
          { dataName: "Emelet", dataValue: this.address.floor },
          { dataName: "Ajtó", dataValue: this.address.door },
        ];

        console.log(this.address)

        this.loadingSpinner.address = false;

        this.findAttachedUnit(this.address.id);
      });
    });
  }

  findAttachedUnit(addressId: number){
    this.attachedTo = [];

    this.storageService.getStorages().subscribe(res => {
      res.map((storage) => {
        if(storage.addressId === addressId)
          this.attachedTo.push(storage);
      });
    });  

    this.storeService.getStores().subscribe(res => {
      res.map((store) => {
        if(store.addressId === addressId)
          this.attachedTo.push(store);
      });
    })
  }

  showDeleteAddressDialog(){
    if(this.attachedTo.length > 0){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `A cím nem törölhető, amíg egységek vannak hozzárendelve!`
      });
      return;
    }

    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${this.address.shortName} (azonosító: ${this.address.id}) címet?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteAddress()
    });
  }
  
  showEditDialog(){
    this.dialogs.edit = true;
  }
  
  hideEditDialog(){
    this.dialogs.edit = false;
  }

  editAddress(){
    let validStatus: ValidationResult = validateAddress(this.address);
    if(!validStatus.isValid){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `${validStatus.message}`
      });
      return;
    }

    this.addressService.putAddress(this.address.id, this.address).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen szerkesztetted a(z) ${this.address.shortName} címet`
      })

      this.hideEditDialog();
    });
  }

  deleteAddress() {
    this.addressService.deleteAddress(this.address.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${this.address.shortName} (Azonosító: ${this.address.id}) raktárat`
      });

      this.router.navigate(["/addresses"]);
    });
  }
}