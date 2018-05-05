import { Customer } from '../models/Customer';

export class Order {
    orderId: number;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    customer: Customer;
    submitted: string;
}
