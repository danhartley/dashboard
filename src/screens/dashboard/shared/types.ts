import { Dispatch, SetStateAction } from "react";

export type SliderState = {
  value: number;
  text: string;
};

export type SliderProps = {
  intialState: number;
  range: { id: number; snapshot: string }[];
  namespace: string;
  onChange: Dispatch<SetStateAction<number>>;
};

export type ControlsProps = {
  snapshotId: number;
  snapshots: { id: number; snapshot: string }[];
  namespace?: string;
  onChange: Dispatch<SetStateAction<number>>;
};

export type PledgeRowProps = {
  colSpan: number;
  pledge: {
    name: string;
    honoured: number;
    broken: number;
  };
};

export type PledgesRowProps = {
  source: string;
  colSpan: number;
  pledges: {
    name: string;
    honoured: number;
    broken: number;
  }[];
};

export type TotalsProps = {
    totals: {
        honoured: number,
        broken: number,
        features?: number
    }
};

export type ValueProps = {
    value: {
        name: string,
        honoured: number,
        broken: number,
        features: number,
        pledges: {
            name: string;
            honoured: number;
            broken: number;
        }[]; 
    }
}

export type TableProps = {
  source: string;
  snapshotId: number;
  setSnapshotId: Dispatch<SetStateAction<number>>;
}