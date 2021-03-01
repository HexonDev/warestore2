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

  constructor(private accountService: AccountService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.username, this.password)
    this.accountService.loginUser(this.username, this.password).pipe(first())
    .subscribe(res => {
      this.router.navigate(["/home"])
      this.messageService.add({
        severity: "success",
        summary: "Siker!",
        detail: `Sikeresen bejelentkeztél, mint ${this.username}!`
      })

      console.log(new Date(res.tokenExpired), res.tokenExpired)
    },
    error => {
      this.messageService.add({
        severity: "error",
        summary: "Hiba!",
        detail: `Hibás felhasználónév vagy jelszó!`
      })
      console.log(error);
    });
  }
}
