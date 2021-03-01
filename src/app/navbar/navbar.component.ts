import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  items: MenuItem[];  
  loggedIn: boolean = this.accountService.userValue != null;
  userSubscription: Subscription;

  constructor(private accountService: AccountService, private messageService: MessageService) { 
    this.userSubscription = this.accountService.user.subscribe(res => {
      this.loggedIn = res != null;
      this.setupMenuItems();
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setupMenuItems();
  }

  setupMenuItems(){
    this.items = [
      {
        label: 'Bejelentkezés',
        icon: 'fas fa-sign-in-alt',
        routerLink: '/login',
        visible: !this.loggedIn
      },
      {
        label: 'Főoldal',
        icon: 'fas fa-fw fa-home',
        routerLink: '/home',
        visible: this.loggedIn
      },
      {
        label: 'Raktárak',
        icon: 'fas fa-fw fa-warehouse',
        items: [
          {
            label: 'Kilistázás',
            icon: 'fas fa-fw fa-list',
            routerLink: '/storages'
          }
        ],
        visible: this.loggedIn
      },
      {
        label: 'Áruházak',
        icon: 'fas fa-fw fa-store-alt',
        items: [
          {
            label: 'Kilistázás',
            icon: 'fas fa-fw fa-list',
            routerLink: '/stores'
          }
        ],
        visible: this.loggedIn
      },
      {
        label: 'Címek',
        icon: 'fas fa-fw fa-map-marker-alt',
        items: [
          {
            label: 'Kilistázás',
            icon: 'fas fa-fw fa-list'
          },
          {
            label: 'Létrehozás',
            icon: 'fas fa-fw fa-plus-circle'
          },
        ],
        visible: this.loggedIn
      },
      {
        label: 'Termékek',
        icon: 'fas fa-fw fa-boxes',
        items: [
          {
            label: 'Kilistázás',
            icon: 'fas fa-fw fa-list'
          },
          {
            label: 'Létrehozás',
            icon: 'fas fa-fw fa-plus-circle'
          },
        ],
        visible: this.loggedIn
      },
      {
        label: 'Információk',
        icon: 'fas fa-fw fa-info-circle',
        routerLink: '/info',
        visible: this.loggedIn
      }
    ];
  }

  logout(){
    this.messageService.add({
      severity: "success",
      summary: "Siker!",
      detail: `Kijelentkeztél a felhasználódból!`
    });

    this.accountService.logoutUser();
  }
}
