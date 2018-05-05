import { Account } from '../models/Account';
import { Item } from '../models/Item';

export class Seller {
    sellerId: number;
    account: Account;
    email: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    items: Item[];
}
