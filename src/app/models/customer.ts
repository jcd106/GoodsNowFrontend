import { Account } from '../models/account';

export class Customer {
    customerId: number;
    account: Account;
    email: string;
    firstName: string;
    lastName: string;
}
