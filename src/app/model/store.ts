import { Address } from "./address";
import { Product } from "./product";

export class Store {
	constructor() {}

	id: number;
	addressId: number;
	address: Address;
	name: string;
	stock: Product[];

	getRouterLink(): string {
		return "stores/" + this.id;
	}
}