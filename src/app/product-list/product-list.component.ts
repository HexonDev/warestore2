import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  products: Product[];
  selectedProducts: Product[];

  productDialog: boolean = false;

  loadingSpinner = {
    products: false
  }

  showBarcodeValue: boolean = false;
  barcodeBackground: boolean = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.loadingSpinner.products = true;

    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.loadingSpinner.products = false;
    });
  }

  showDeleteProductDialog(product: Product){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${product.name} (azonosító: ${product.id}) terméket?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteProduct(product)
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${product.name} terméket`
      });

      this.loadProducts();
    });
  }
}
