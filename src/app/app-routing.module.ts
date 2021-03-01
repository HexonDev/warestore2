import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageComponent } from './storage/storage.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreComponent } from './store/store.component';

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
