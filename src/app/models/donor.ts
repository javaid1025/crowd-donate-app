import {User} from './user';

export class Donor {
    user: User;
    address: Address;
}

export class Address {
    street: string;
    city: string;
    state: string;
}
