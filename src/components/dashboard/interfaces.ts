import { Dispatch, SetStateAction } from 'react';
import { AssistedTechnology, DashboardStyle, Source } from './enums';

// export interface Device {
//     type: AssistedTechnology
// }

// export interface Dashboard {
//     type: DashboardStyle
// }

export interface IPledge {
    name: string;
    honoured: number;
    broken: number;
}

export interface IItem {
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

export interface ISlider {
    intialState: string, 
    range: string[], 
    onChange: Dispatch<SetStateAction<string>>
}

export interface IControls {
    snapShot: string, 
    snapShots: string[], 
    onChange: Dispatch<SetStateAction<string>>
    
}