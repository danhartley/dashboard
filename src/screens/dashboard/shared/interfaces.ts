import { Source } from "./enums";

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
  features: number;
}

export interface IPledgesByFeatureSnapshot {
  source: string;
  snapshot?: string;
  id: number;
  snapshots?: {
      id: number,
      snapshot: string
  }[],
  items: IItem[];
  error?: any;
}

export interface IPledgesByValueSnapshot {
  source: string;
  snapshot?: string;
  id: number;
  snapshots?: {
      id: number,
      snapshot: string
  }[],
  items: IItem[];
  error?: any;
}

export interface IValue {
  source: string;
  items: IItem[];
}
