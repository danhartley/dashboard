import { Dispatch, SetStateAction } from 'react';

export type SliderState = {
    value: number,
    text: string
};

export type SliderProps = {
    intialState:number, 
    range: { id: number, snapshot: string }[], 
    onChange: Dispatch<SetStateAction<number>>
}

export type ControlsProps = {
    snapshotId: number, 
    snapshots: { id: number, snapshot: string }[],
    onChange: Dispatch<SetStateAction<number>>    
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