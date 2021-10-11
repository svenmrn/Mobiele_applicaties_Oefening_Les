import { Color } from './color';

export interface ILabel {
    name: string;
    color: Color;
    id: number;
}

export class Label implements ILabel {
    name: string;
    color: Color;
    id: number;

    constructor(obj: ILabel) {
        // This type of constructor is called a copy constructor and copies every
        // attribute in the parameter (obj) to the newly created instance, i.e. this.
        Object.assign(this, obj);
    }

    private getColor(): string {
         const x = Object.values(Color)[this.color];
         return x.toString();
    }
}
