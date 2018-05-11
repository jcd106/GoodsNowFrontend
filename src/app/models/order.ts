import { Customer } from '../models/customer';

export class Order {
    orderId: number;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    customer: Customer;
    submitted: string;
}
