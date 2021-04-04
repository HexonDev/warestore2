import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, validateUser } from '../model/user';
import { ValidationResult } from '../model/validationresult';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private accountService: AccountService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  users: User[];
  selectedUsers: User[];

  user: User;
  userDialog: boolean = false;
  password2: string;
  isAdmin: boolean;

  loadingSpinner = {
    users: false
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.loadingSpinner.users = true;

    this.accountService.getUsers().subscribe(res => {
      this.users = res;
      this.loadingSpinner.users = false;
    });
  }

  showAddDialog(){
    this.user = new User();
    this.userDialog = true;
  }

  hideAddDialog(){
    this.userDialog = false;
    this.user = null;
  }

  showDeleteDialog(user: User){
    this.confirmationService.confirm({
      header: "Megerősítés",
      message: `Valóban törölni szeretnéd a(z) ${user.username} (azonosító: ${user.id}) felhasználót?`,
      acceptIcon: "fa fa-check",
      rejectIcon: "fa fa-times",
      icon: "fa fa-exclamation-triangle",
      acceptButtonStyleClass: "p-button-warning",
      rejectButtonStyleClass: "p-button-danger",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: () => this.deleteUser(user)
    });
  }

  addUser(){
    this.user.permissionLevel = this.isAdmin ? 1 : 0;

    let validStatus: ValidationResult = validateUser(this.user, true, this.password2);

    if(!validStatus.isValid){
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `${validStatus.message}`
      });
      return;
    }

    this.accountService.registerUser(this.user).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen hozzáadtad a(z) ${this.user.username} felhasználót`
      });

      this.loadUsers();
      this.hideAddDialog();
    },
    error => {
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `A(z) ${this.user.username} felhasználónév már regisztrálva lett`
      });
    });
  }

  deleteUser(user: User){
    this.accountService.deleteUser(user.id).subscribe(res => {
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen törölted a(z) ${user.username} felhasználót`
      });

      this.loadUsers();
    });
  }
}
