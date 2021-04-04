import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';
import {SidebarModule} from 'primeng/sidebar';
import {SlideMenuModule} from 'primeng/slidemenu';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import {FieldsetModule} from 'primeng/fieldset';
import {SplitButtonModule} from 'primeng/splitbutton';
import {NgxBarcodeModule} from 'ngx-barcode';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {PasswordModule} from 'primeng/password';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InfoComponent } from './info/info.component';
import { StorageListComponent } from './storage-list/storage-list.component';

import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { StoreListComponent } from './store-list/store-list.component';
import { StorageComponent } from './storage/storage.component';
import { AuthInterceptor } from './auth/interceptor';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/guard';
import { StoreComponent } from './store/store.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressComponent } from './address/address.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { PermissionGuard } from './permission/guard';
import { APP_BASE_HREF } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    InfoComponent,
    StorageListComponent,
    StoreListComponent,
    StorageComponent,
    LoginComponent,
    StoreComponent,
    AddressListComponent,
    AddressComponent,
    ProductListComponent,
    ProductComponent,
    UserListComponent,
    UserComponent,
  ],
  imports: [
    PasswordModule,
    ToggleButtonModule,
    NgxBarcodeModule,
    SplitButtonModule,
    FormsModule,
    ProgressSpinnerModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
		RadioButtonModule,
    RippleModule,
    TabViewModule,
    SidebarModule,
    SlideMenuModule,
    CardModule,
    FontAwesomeModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ToastModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FieldsetModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent, AuthGuard, PermissionGuard]
})
export class AppModule { }
