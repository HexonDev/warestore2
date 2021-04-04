import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, validateUser } from '../model/user';
import { ValidationResult } from '../model/validationresult';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  user: User;
  userData: any[];

  loadingSpinner = {
    user: false
  };

  dialogs = {
    edit: false
  };

  isAdmin: boolean;
  password2: string;

  ngOnInit(): void {
    this.loadingSpinner.user = true;

    this.route.params.subscribe(params => {
      this.accountService.getUser(params.id).subscribe(res => {
        this.user = res;
        this.updateData();
        this.loadingSpinner.user = false;
      });
    });
  }

  updateData(){
    this.isAdmin = this.user.permissionLevel === 1; 
    this.userData = [
      { dataName: "Azonosító", dataValue: this.user.id },
      { dataName: "Felhasználónév", dataValue: this.user.username },
      { dataName: "Vezetéknév", dataValue: this.user.lastName },
      { dataName: "Keresztnév", dataValue: this.user.firstName },
      { dataName: "Hozzáférési szint", dataValue: this.user.permissionLevel },
    ];
  }

  showEditDialog(){
    this.dialogs.edit = true
  }

  hideEditDialog(){
    this.dialogs.edit = false;
  }

  showDeleteDialog(){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${this.user.username} (azonosító: ${this.user.id}) felhasználót?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteUser()
    });
  }

  editUser(){
    this.user.permissionLevel = this.isAdmin ? 1 : 0;

    let validStatus: ValidationResult = validateUser(this.user);

    if(!validStatus.isValid){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `${validStatus.message}`
      });
      return;
    }

    this.accountService.putUser(this.user.id, this.user).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen szerkesztetted a(z) ${this.user.username} felhasználót`
      });

      this.updateData();
      this.hideEditDialog();
    },
    error => {
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `A(z) ${this.user.username} felhasználónév már regisztrálva lett`
      });
    });
  }

  deleteUser(){
    this.accountService.deleteUser(this.user.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${this.user.username} felhasználót`
      });

      this.router.navigate(["/users"]);
    });
  }
}
