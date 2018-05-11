import { Account } from '../models/account';
import { Item } from '../models/item';

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
    money: number;
}
