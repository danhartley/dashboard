import { useState } from "react";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { PledgesRow } from "./rows/pledges";
import {
  IPledge,
  IPledgesByFeatureSnapshot,
} from "src/screens/dashboard/shared/interfaces";
import { TotalsProps, TableProps } from "src/screens/dashboard/shared/types";

import TableControls from "src/screens/dashboard/tables/table-controls";

const Figure = ({
  title,
  children,
}: {
  title?: string;
  children?: JSX.Element | JSX.Element[];
}) => {
  return (
    <figure className="w-full border-solid border-slate-900 dark:border-slate-50 border-4 rounded-md p-3 my-2">
      <figcaption className="font-serif mb-4">
        <em>{title} pledges honoured and broken by feature</em>
      </figcaption>
      {children}
    </figure>
  );
};

const Header = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <th className="text-xs uppercase tracking-wide" colSpan={2}>
          Pledges
        </th>
      </tr>
      <tr>
        <th className="pb-2 text-left text-xs uppercase tracking-wide w-3/5">
          Feature
        </th>
        <th className="text-xs uppercase tracking-wide w-1/5 after:content-['✓'] md:after:content-['Honoured']"></th>
        <th className="text-xs uppercase tracking-wide w-1/5 after:content-['✗'] md:after:content-['Broken']"></th>
      </tr>
    </thead>
  );
};

type Feature = {
  name: string;
  honoured: number;
  broken: number;
  pledges: IPledge[];
};

export const Row = ({ feature }: { feature: Feature }) => {
  const [selectedFeature, setSelectedFeature] = useState("");

  const handleClick = (id) => {
    id !== selectedFeature ? setSelectedFeature(id) : setSelectedFeature("");
  };

  const isSelected = feature.name.toLowerCase() === selectedFeature;

  return (
    <>
      <tr>
        <td className="my-2 py-2">
          <button onClick={() => handleClick(feature.name.toLowerCase())}>
            {feature.name}
          </button>
        </td>
        <td className={"my-2 text-center"}>{feature.honoured}</td>
        <td className={"my-2 text-center"}>{feature.broken}</td>
      </tr>
      {isSelected ? (
        <PledgesRow
          key={feature.name}
          pledges={feature.pledges}
          colSpan={3}
          source={feature.name}
        ></PledgesRow>
      ) : null}
    </>
  );
};

const Footer = ({ totals }: TotalsProps) => {
  return (
    <tfoot>
      <tr>
        <th
          className="text-xs uppercase tracking-wide text-left pt-6"
          scope="row"
        >
          Totals
        </th>
        <th>{totals.honoured}</th>
        <th>{totals.broken}</th>
      </tr>
    </tfoot>
  );
};

export const DashboardFeaturesTable = ({
  source,
  snapshotId,
  setSnapshotId,
}: TableProps) => {
  type Error = {
    message?: string;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }: {
    data: IPledgesByFeatureSnapshot;
    isLoading: boolean;
    isError: boolean;
    error: Error;
    isSuccess: boolean;
  } = useFeaturesWithTotals({ source, snapshotId });

  if (isLoading) {
    return (
      <Figure>
        <span>Loading...</span>
      </Figure>
    );
  }

  if (isError) {
    return <Figure title={error.message} />;
  }

  if (isSuccess) {
    return (
      <Figure title={data.source}>
        <table
          role="tabpanel"
          data-table-id="features"
          className="w-11/12 text-xs sm:text-base"
        >
          <Header />
          <tbody>
            {data.items.map((feature) => {
              return <Row key={feature.name} feature={feature}></Row>;
            })}
          </tbody>
          <Footer totals={data.totals} />
        </table>
        <TableControls
          namespace="features"          
          snapshotId={data.snapshotId}
          snapshots={data.snapshots.filter(s => s.source === data.source)}
          onChange={setSnapshotId}
        ></TableControls>
      </Figure>
    );
  }
};

export default DashboardFeaturesTable;
