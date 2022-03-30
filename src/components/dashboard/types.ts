import { Dispatch, SetStateAction } from 'react';

export type SliderState = {
    value: number,
    text: string
};

export type SliderProps = {
    intialState:string, 
    range:string[], 
    onChange: Dispatch<SetStateAction<string>>
}

export type ControlsProps = {
    snapShot: string, 
    snapShots: string[], 
    onChange: Dispatch<SetStateAction<string>>    
}

export type PledgesRowProps = {
    source: string,
    colSpan: number,
    pledges: {
            name: string;
            honoured: number;
            broken: number;
    }[]
    
}