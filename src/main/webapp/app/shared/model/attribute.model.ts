import { IProperty } from 'app/shared/model//property.model';

export interface IAttribute {
    id?: string;
    key?: string;
    value?: string;
    keyLabel?: string;
    valueLabel?: string;
    property?: IProperty;
}

export class Attribute implements IAttribute {
    constructor(
        public id?: string,
        public key?: string,
        public value?: string,
        public keyLabel?: string,
        public valueLabel?: string,
        public property?: IProperty
    ) {}
}
