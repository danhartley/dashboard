import { Source } from "./enums";

export interface IPledge {
  name: string;
  honouring: number;
  breaking: number;
}

export interface IItem {
  id: number;
  name: string;
  value: string;
  honouring: number;
  breaking: number;
  pledges: IPledge[];
  features: number;
}

export interface IPledgesByFeatureSnapshot {
  source: string;
  snapshot?: string;
  id: number;
  snapshotId: number;
  snapshots?: {
    id: number;
    snapshot: string;
    snapshotId: number;
    source: string;
  }[];
  items: IItem[];
  error?: any;
  totals: {
    honouring: number;
    breaking: number;
    features?: number;
  };
}

export interface IPledgesByValueSnapshot {
  source: string;
  snapshot?: string;
  id: number;
  snapshotId: number;
  snapshots?: {
    id: number;
    snapshot: string;
    snapshotId: number;
    source: string;
  }[];
  items: IItem[];
  error?: any;
  totals: {
    honouring: number;
    breaking: number;
    features?: number;
  };
}

export interface IValue {
  source: string;
  items: IItem[];
}
