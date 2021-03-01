import { Address } from "./address";
import { Product } from "./product";

export class Storage {

	constructor(){}

	id?: number;
	name: string;
	addressId: number;
	address: Address;
	products?: Product[]; 
}