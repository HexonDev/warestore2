import { observeOn } from "rxjs/operators";
import { ValidationResult } from "./validationresult";

export class User {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	permissionLevel: number;
	token: string;
	tokenExpired: string;
	password?: string;
}

export function validateUser(user: User, validatePassword?: boolean, password2?: string): ValidationResult {
	if(!user.username || !user.firstName || !user.lastName){
		return { isValid: false, message: "Minden mező kitöltése kötelező"};
	}

	if(validatePassword){
		if(!user.password || !password2){
			return { isValid: false, message: "Minden mező kitöltése kötelező"};
		}
		
		if(user.password !== password2){
			return { isValid: false, message: "A megadott jelszavak nem egyeznek"};
		}
	}

	

	if(user.permissionLevel < 0){
		return { isValid: false, message: "A hozzáférési szint nem lehet mínusz"};
	}

	return { isValid: true, message: null };
}