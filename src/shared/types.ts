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
  target?: ViewType;
  setTarget?: Dispatch<SetStateAction<ViewType>>;
  showSelector?: boolean;
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

export type ViewProps = {
  source: string;
  snapshotId: number;
  setSnapshotId: Dispatch<SetStateAction<number>>;
  showAllViews?: boolean;
};

export type Error = {
  message?: string;
};

// export type ViewType = "chart" | "table";

const VIEWTYPES = {
  CHART: "chart",
  TABLE: "table",
} as const;

export type ViewType = typeof VIEWTYPES[keyof typeof VIEWTYPES];

const PLEDGEACTIONCOLOURS = {
  HONOURING: "#ADFB2E", // honouring
  BREAKING: "#FDC0CB", // breaking
} as const;

export type ColourType =
  typeof PLEDGEACTIONCOLOURS[keyof typeof PLEDGEACTIONCOLOURS];
