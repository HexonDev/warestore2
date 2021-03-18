import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  loadingSpinner = {
    login: false
  };

  constructor(private accountService: AccountService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {}

  login(){
    this.loadingSpinner.login = true;

    console.log(this.username, this.password)
    this.accountService.loginUser(this.username, this.password).pipe(first())
    .subscribe(res => {
      this.router.navigate(["/home"])
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen bejelentkeztél, mint ${this.username}!`
      })

      this.loadingSpinner.login = false;
    },
    error => {
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `Hibás felhasználónév vagy jelszó!`
      })
      this.loadingSpinner.login = false;
    });
  }
}
