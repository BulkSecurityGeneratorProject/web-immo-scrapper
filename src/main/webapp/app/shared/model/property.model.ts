import { Moment } from 'moment';
import { IAttribute } from 'app/shared/model//attribute.model';
import { ILocation } from 'app/shared/model//location.model';

export interface IProperty {
    id?: string;
    reference?: number;
    publicationDate?: Moment;
    categoryName?: string;
    subject?: string;
    body?: string;
    url?: string;
    price?: number;
    attributes?: IAttribute[];
    location?: ILocation;
}

export class Property implements IProperty {
    constructor(
        public id?: string,
        public reference?: number,
        public publicationDate?: Moment,
        public categoryName?: string,
        public subject?: string,
        public body?: string,
        public url?: string,
        public price?: number,
        public attributes?: IAttribute[],
        public location?: ILocation
    ) {}
}
