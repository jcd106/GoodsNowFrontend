import { Seller } from '../models/seller';

export class Item {
    itemId: number;
    itemName: string;
    description: string;
    seller: Seller;
    price: number;
    image: string;
    category: string;
}
