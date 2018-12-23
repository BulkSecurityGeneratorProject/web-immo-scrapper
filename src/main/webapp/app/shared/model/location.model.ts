import { IProperty } from 'app/shared/model//property.model';

export interface ILocation {
    id?: string;
    regionName?: string;
    departmentName?: string;
    city?: string;
    zipcode?: string;
    properties?: IProperty[];
}

export class Location implements ILocation {
    constructor(
        public id?: string,
        public regionName?: string,
        public departmentName?: string,
        public city?: string,
        public zipcode?: string,
        public properties?: IProperty[]
    ) {}
}
