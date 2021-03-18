import { ValidationResult } from "./validationresult";

export class Address {
	constructor(){
		this.addressString = `${this.country}, ${this.city}, ${this.zipCode}, ${this.name} ${this.type} ${this.number} ${this.floor}/${this.door}`;
	}

	id: number;
	addressString: string;
	shortName?: string;
	country: string;
	zipCode: number;
	city: string;
	name: string;
	type: string;
	number: string;
	floor: string
	door: string; 
}

export function validateAddress(address: Address): ValidationResult {
	if(!address.shortName || !address.country || !address.zipCode || !address.city || !address.name || !address.type || !address.number || !address.floor || !address.door){
		return { isValid: false, message: "Minden mező kitöltése kötelező"}
	} 
	
	if(address.zipCode < 1){
		return { isValid: false, message: "Az irányítószámnak 0-nál nagyobbnak kell lennie"}
	}

	return { isValid: true, message: null};
}