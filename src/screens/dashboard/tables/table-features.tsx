import { useState } from "react";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { PledgesRow } from "./rows/pledges";
import { IPledge, IPledgesByFeatureSnapshot } from "src/shared/interfaces";
import { TotalsProps, TableProps } from "src/shared/types";
import Figure from "src/screens/dashboard/tables/figure/figure";
import TableControls from "src/screens/dashboard/tables/table-controls";
import FeaturesChart from "src/screens/dashboard/charts/chart-features";

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

  const [target, setTarget] = useState("table");

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
      <Figure title="Pledges by principle">
        {target === "table" ? (
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
        ) : target === "chart" ? (
          <FeaturesChart totals={data.totals}></FeaturesChart>
        ) : null}

        <TableControls
          namespace="features"
          snapshotId={data.snapshotId}
          snapshots={data.snapshots.filter((s) => s.source === data.source)}
          onChange={setSnapshotId}
          target={target}
          setTarget={setTarget}
        ></TableControls>
      </Figure>
    );
  }
};

export default DashboardFeaturesTable;

const Header = (): JSX.Element => {
  const css =
    "text-sky-800 font-normal text-xs sm:text-sm tracking-wider uppercase pb-2";

  return (
    <thead>
      <tr>
        <th>
          <span className="hidden">for accessibility</span>
        </th>
        <th className={css} colSpan={2}>
          Pledges
        </th>
      </tr>
      <tr>
        <th className={`${css} text-left w-3/5`}>Principle</th>
        <th
          className={`${css} w-1/5 after:content-['✓'] md:after:content-['honouring']`}
        >
          <span className="hidden">for accessibility</span>
        </th>
        <th
          className={`${css} w-1/5 after:content-['✗'] md:after:content-['breaking']`}
        >
          <span className="hidden">for accessibility</span>
        </th>
      </tr>
    </thead>
  );
};

type Feature = {
  name: string;
  honouring: number;
  breaking: number;
  pledges: IPledge[];
};

export const Row = ({ feature }: { feature: Feature }): JSX.Element => {
  const [selectedFeature, setSelectedFeature] = useState("");

  const handleClick = (id) => {
    id !== selectedFeature ? setSelectedFeature(id) : setSelectedFeature("");
  };

  const isSelected = feature.name.toLowerCase() === selectedFeature;

  return (
    <>
      <tr>
        <td className="my-2 py-2 hover:text-orange-800">
          <button
            className="text-left"
            onClick={() => handleClick(feature.name.toLowerCase())}
          >
            {feature.name}
          </button>
        </td>
        <td className={"my-2 text-center"}>{feature.honouring}</td>
        <td className={"my-2 text-center"}>{feature.breaking}</td>
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

const Footer = ({ totals }: TotalsProps): JSX.Element => {
  return (
    <tfoot>
      <tr>
        <th
          className="text-xs uppercase tracking-wider text-left pt-6 font-normal"
          scope="row"
        >
          Totals
        </th>
        <th className="text-sky-800 font-normal">{totals.honouring}</th>
        <th className="text-sky-800 font-normal">{totals.breaking}</th>
      </tr>
    </tfoot>
  );
};
