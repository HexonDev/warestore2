import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address, validateAddress } from '../model/address';
import { ValidationResult } from '../model/validationresult';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  constructor( private addressService: AddressService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  addresses: Address[];
  address: Address;
  selectedAddresses: Address[];

  addressDialog: boolean = false;
  loadingSpinner = {
    addresses: false
  };

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(){
    this.loadingSpinner.addresses = true;

    this.addressService.getAddresses().subscribe(res => {
      this.addresses = res;
      this.loadingSpinner.addresses = false;
    })
  }

  showAddAddressDialog(){
    this.address = new Address();
    this.addressDialog = true;
  }

  hideAddAddressDialog(){
    this.addressDialog = false;
  }

  showDeleteAddressDialog(address: Address){
    this.messageService.add({
      severity: "warn",
      summary: "Figyelem!",
      detail: `A törlés csak az adott cím adatlapján érhető el!`
    });
  }

  saveAddress(){
    let validStatus: ValidationResult = validateAddress(this.address);

    if(!validStatus.isValid){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `${validStatus.message}`
      });
      return;
    }

    this.addressService.postAddress(this.address).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen létrehoztad a(z) ${this.address.shortName} címet`
      });

      this.loadAddresses();
      this.hideAddAddressDialog();
    });
  }

  deleteAddress(address: Address){
    this.addressService.deleteAddress(address.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${address.addressString} címet`
      });

      this.loadAddresses();
    });
  }

}
