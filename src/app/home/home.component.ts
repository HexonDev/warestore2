import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { Storage } from '../model/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  storages: Storage[];

  ngOnInit(): void {
    this.storageService.getStorages().subscribe(res => this.storages = res);
  }

}
