import { Account } from '../models/Account';

export class Customer {
    customerId: number;
    account: Account;
    email: string;
    firstName: string;
    lastName: string;
}
