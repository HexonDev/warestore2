import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { MessageService } from "primeng/api";
import { AccountService } from "../service/account.service";

@Injectable({
	providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
	constructor(private accountService: AccountService, private router: Router, private messageService: MessageService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		const user = this.accountService.userValue;

		if(user){
			if(user.permissionLevel >= 1){
				return true;
			}
		}

		this.messageService.add({
			severity: "warn",
			summary: "Figyelem!",
			detail: "Megfelelő engedélyek nélkül nem érheted el a kívánt oldalt!"
		});

		return false;
	}
}