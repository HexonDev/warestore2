import { ProductData } from "./productdata";
import { ValidationResult } from "./validationresult";

export class Product {
	constructor(){}

	id: number;
	name: string;
	amount: number;
	data: ProductData[];
	barcode: string;
}

export function validateProduct(product: Product): ValidationResult {
	if(!product.name || !product.amount || !product.barcode){
		return { isValid: false, message: "Minden mező kitöltése kötelező"}
	} 
	
	return { isValid: true, message: null};
}