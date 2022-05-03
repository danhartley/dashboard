import { Dispatch, SetStateAction } from "react";

export type SliderState = {
  value: number;
  text: string;
};

export type SliderProps = {
  intialState: number;
  range: { id: number; snapshot: string; snapshotId: number }[];
  namespace: string;
  onChange: Dispatch<SetStateAction<number>>;
};

export type ControlsProps = {
  snapshotId: number;
  snapshots: {
    id: number;
    snapshot: string;
    snapshotId: number;
    source: string;
  }[];
  namespace?: string;
  onChange: Dispatch<SetStateAction<number>>;
};

export type PledgeRowProps = {
  colSpan: number;
  pledge: {
    name: string;
    honouring: number;
    breaking: number;
  };
};

export type PledgesRowProps = {
  source: string;
  colSpan: number;
  pledges: {
    name: string;
    honouring: number;
    breaking: number;
  }[];
};

export type TotalsProps = {
  totals: {
    honouring: number;
    breaking: number;
    features?: number;
  };
};

export type ValueProps = {
  value: {
    name: string;
    honouring: number;
    breaking: number;
    features: number;
    pledges: {
      name: string;
      honouring: number;
      breaking: number;
    }[];
  };
};

export type PledgeProps = {
  pledge: {
    name: string;
    checklist: [
      {
        check: string;
        checked: boolean;
      }
    ];
  };
};

export type TableProps = {
  source: string;
  snapshotId: number;
  setSnapshotId: Dispatch<SetStateAction<number>>;
};
