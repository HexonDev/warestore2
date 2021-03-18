import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address } from '../model/address';
import { Product, validateProduct } from '../model/product';
import { ProductData } from '../model/productdata';
import { Store } from '../model/store';
import { ValidationResult } from '../model/validationresult';
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
          { dataName: "Cím", dataValue: this.store.address.shortName },
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

  showDeleteStoreDialog(){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${this.store.name} (azonosító: ${this.store.id}) raktárat?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteStore()
    })
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

    this.storeService.postStoreProduct(this.store.id, this.product).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen hozzáadtad a terméket a(z) ${this.store.name} nevű áruházhoz`
      })

      this.loadProducts();
      this.hideProductDialog();
    });
  }

  deleteStore(){
    this.storeService.deleteStore(this.store.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${this.store.name} (azonosító: ${this.store.id}) nevű áruházat`
      });

      this.router.navigate(["/stores"]);
    });
  }

  editStore(){
    if(!this.store.name || !this.store.addressId){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `Minden mező kitöltése kötelező!`
      })
      return
    }

    this.store.address = this.addresses.find(a => a.id === this.store.addressId);

    this.storeService.putStore(this.store.id, this.store).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen szerkesztetted a(z) ${this.store.name} nevű raktárat`
      })

      this.hideEditDialog();
    });
  }
}
