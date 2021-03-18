import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product, validateProduct } from '../model/product';
import { ProductData } from '../model/productdata';
import { Storage } from '../model/storage';
import { Store } from '../model/store';
import { ValidationResult } from '../model/validationresult';
import { ProductService } from '../service/product.service';
import { StorageService } from '../service/storage.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product;
  productData: any[];

  barcodeBackground: boolean = false;

  attachedTo: Array<Store | Storage>;

  loadingSpinner = {
    product: false
  };

  dialogs = {
    edit: false
  }

  constructor(private productService: ProductService, private storageService: StorageService, private storeService: StoreService, private route: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.loadingSpinner.product = true;

    this.route.params.subscribe(params => {
      this.productService.getProduct(params.id).subscribe(res => {
        this.product = res;
        this.updateData();
        this.loadingSpinner.product = false;

        this.findAttachedUnit();
      });
    });
  }

  updateData(){
    this.productData = [
      { dataName: "Azonosító", dataValue: this.product.id },
      { dataName: "Név", dataValue: this.product.name },
      { dataName: "Vonalkód", dataValue: this.product.barcode || "Nincs" },
    ];
  }

  findAttachedUnit(){
    this.attachedTo = [];

    this.storageService.getStorages().subscribe(res => {
      res.forEach((storage) => {
        storage.products.forEach((product) => {
          if(product.barcode === this.product.barcode)
            this.attachedTo.push(storage);
        });
      });
    }) 

    this.storeService.getStores().subscribe(res => {
      res.forEach((store) => {
        store.stock.forEach((product) => {
          if(product.barcode === this.product.barcode)
            this.attachedTo.push(store);
        });
      });
    })
  }

  addProductData(){
    this.product.data.push(new ProductData());
  }

  deleteProductData(dataIndex){
    this.product.data.splice(dataIndex, 1);
  }


  showEditDialog(){
    this.dialogs.edit = true;
  }

  hideEditDialog(){
    this.dialogs.edit = false;
  }

  showDeleteDialog(){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${this.product.name} (azonosító: ${this.product.id}) terméket?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteProduct()
    })
  }

  editProduct(){
    let validStatus: ValidationResult = validateProduct(this.product);

    if(!validStatus.isValid){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `${validStatus.message}`
      });
      return;
    }

    this.productService.putProduct(this.product.id, this.product).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen szerkesztetted a(z) ${this.product.name} terméket`
      })

      this.updateData();
      this.hideEditDialog();
    });
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${this.product.name} (Azonosító: ${this.product.id}) terméket`
      });

      this.router.navigate(["/products"]);
    });
  }
}
