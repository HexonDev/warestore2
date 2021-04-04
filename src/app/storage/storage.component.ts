import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address } from '../model/address';
import { Product, validateProduct } from '../model/product';
import { ProductData } from '../model/productdata';
import { Storage } from '../model/storage';
import { ValidationResult } from '../model/validationresult';
import { AddressService } from '../service/address.service';
import { StorageService } from '../service/storage.service';


@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})



export class StorageComponent implements OnInit {

  constructor(private storageService: StorageService, private addressService: AddressService, private route: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  storage: Storage;
  storageData: any[];

  product: Product;
  products: Product[];

  addresses: Address[];

  loadingSpinner = {
    addresses: false,
    storage: false
  };

  dialogs = {
    edit: false,
    product: false,
  }

  ngOnInit(): void {
    this.loadingSpinner.storage = true;

    this.route.params.subscribe(params => {
      this.storageService.getStorage(params.id).subscribe(res => {
        this.storage = res;

        this.storageData = [
          { dataName: "Azonosító", dataValue: this.storage.id },
          { dataName: "Név", dataValue: this.storage.name },
          { dataName: "Cím", dataValue: this.storage.address.shortName },
          { dataName: "Termékek száma", dataValue: this.storage.products.length == 0 ? "Nincs termék a raktárban (0)" : this.storage.products.length }
        ];   
        
        this.loadProducts();

        this.checkLoadingStatus();
      });
    })
  }

  loadProducts(){
    this.storageService.getStorageProducts(this.storage.id).subscribe(res => {
      this.products = res;
      this.checkLoadingStatus();
    })
  }

  showProductDialog(){
    this.product = new Product();
    this.product.data = [];
    
    this.dialogs.product = true;
  }

  hideProductDialog(){
    this.dialogs.product = false;
  }

  addProductData(){
    this.product.data.push(new ProductData());
  }

  deleteProductData(dataIndex){
    this.product.data.splice(dataIndex, 1);
  }

  addProduct(){
    let validStatus: ValidationResult = validateProduct(this.product);

    if(!validStatus.isValid){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `${validStatus.message}`
      });
      return;
    }
    
    this.storageService.postStorageProduct(this.storage.id, this.product).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen hozzáadtad a terméket a(z) ${this.storage.name} nevű raktárhoz`
      });

      this.loadProducts();
      this.hideProductDialog();
    });
  }

  

  showEditDialog(){ 
    this.loadingSpinner.addresses = true;
    this.dialogs.edit = true;

    this.addressService.getAddresses().subscribe(res => {
      this.addresses = res
      this.loadingSpinner.addresses = false;
    })
  }

  hideEditDialog(){
    this.dialogs.edit = false;
    this.addresses = null;
  }

  checkLoadingStatus(){
    this.loadingSpinner.storage = !this.storage && !this.products ;
  }

  showDeleteStorageDialog(){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${this.storage.name} (azonosító: ${this.storage.id}) raktárat?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteStorage()
    })
  }

  editStorage(){
    if(!this.storage.name || !this.storage.addressId){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `Minden mező kitöltése kötelező!`
      })
      return
    }

    this.storage.address = this.addresses.find(a => a.id === this.storage.addressId);

    this.storageService.putStorage(this.storage.id, this.storage).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen szerkesztetted a(z) ${this.storage.name} nevű raktárat`
      })

      this.hideEditDialog();
    });
  }

  deleteStorage(){
    this.storageService.deleteStorage(this.storage.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${this.storage.name} (Azonosító: ${this.storage.id}) raktárat`
      });

      this.router.navigate(["/storages"]);
    });
  }
}
