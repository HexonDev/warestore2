import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { AccountService } from "../service/account.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private accountService: AccountService, private router: Router, private messageService: MessageService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const user = this.accountService.userValue;

		if(user){
			const expireDate = new Date(user.tokenExpired);

			if(expireDate.getTime() > Date.now()){
				return true;
			}
		}

		this.messageService.add({
			severity: "warn",
			summary: "Figyelem!",
			detail: `Nem vagy bejelentkezve, így nem érheted el a kívánt oldalt!`
		});

		this.accountService.logoutUser();
		return false;
	}
}