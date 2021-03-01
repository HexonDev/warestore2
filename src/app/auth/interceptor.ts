import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "../service/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private accountService: AccountService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const userValue = this.accountService.userValue;

		if(userValue && userValue.token){
			const cloned = req.clone({
				headers: req.headers.set("Authorization", `Bearer ${userValue.token}`)
			});

			return next.handle(cloned);
		}else{
			this.accountService.logoutUser();
			return next.handle(req);
		}
	}
}