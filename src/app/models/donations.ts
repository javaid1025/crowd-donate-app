export class Project {
    uid: string;
    name: string;
    dependents: number;
    startDate: any;
    endDate: any;
    donationsRequired: Donations[];
    show: boolean;
}
export class Donations {
    itemName: string;
    quantity: number;
    quantityUnit: string;
    time: string;
    type: string; // : i.e cloths, money, food, others
    show: boolean;
    image: string;
}
