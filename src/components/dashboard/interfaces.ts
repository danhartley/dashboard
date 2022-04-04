import { Source } from './enums';

export interface IPledge {
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

export interface IPledgesByFeatureSnapshot {
    source: Source | string;
    snapshot: string;
    snapshots?: Array<string>,
    items: IItem[];
    error?: any
}


export interface IValue {
    source: string;
    items: IItem[];
}