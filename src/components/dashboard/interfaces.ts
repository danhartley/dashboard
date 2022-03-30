import { Source } from './enums';

interface IPledge {
    name: string;
    honoured: number;
    broken: number;
}

interface IItem {
    id: number;
    name: string;
    value: string;
    honoured: number;
    broken: number;
    pledges: IPledge[];
    features?: number;
}

export interface IFeature {
    source: Source | string;
    snapShot: string;
    snapShots?: Array<string>,
    items: IItem[];
}


export interface IValue {
    source: string;
    snapShot?: string;
    items: IItem[];
}