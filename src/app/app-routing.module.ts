import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressComponent } from './address/address.component';
import { AuthGuard } from './auth/guard';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { PermissionGuard } from './permission/guard';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageComponent } from './storage/storage.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreComponent } from './store/store.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "info",
    component: InfoComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: "storages",
    component: StorageListComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: "storages/:id",
    component: StorageComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: "stores",
    component: StoreListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "stores/:id",
    component: StoreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addresses",
    component: AddressListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addresses/:id",
    component: AddressComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products",
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/:id",
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UserListComponent,
    canActivate: [AuthGuard, PermissionGuard]
  },
  {
    path: "users/:id",
    component: UserComponent,
    canActivate: [AuthGuard, PermissionGuard]
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
