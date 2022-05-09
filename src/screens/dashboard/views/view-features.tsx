import { useState } from "react";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { IPledgesByFeatureSnapshot } from "src/shared/interfaces";
import { ViewProps } from "src/shared/types";
import Figure from "src/screens/dashboard/tables/figure/figure";
import TableControls from "src/screens/dashboard/tables/table-controls";
import FeaturesTable from "src/screens/dashboard/tables/table-features";
import TotalsChart from "src/screens/dashboard/charts/chart-features";

export const FeaturesView = ({
  source,
  snapshotId,
  setSnapshotId,
  showAllViews = true,
}: ViewProps) => {
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
        {showAllViews
          ? showComponents(data)
          : ShowComponentsConditionally(target, data)}
        <TableControls
          namespace="features"
          snapshotId={data.snapshotId}
          snapshots={data.snapshots.filter((s) => s.source === data.source)}
          onChange={setSnapshotId}
          target={target}
          setTarget={setTarget}
          showSelector={!showAllViews}
        ></TableControls>
      </Figure>
    );
  }
};

export default FeaturesView;

function ShowComponentsConditionally(
  target: string,
  data: IPledgesByFeatureSnapshot
) {
  return (
    <>
      {target === "table" ? (
        <FeaturesTable data={data}></FeaturesTable>
      ) : target === "chart" ? (
        <TotalsChart totals={data.totals}></TotalsChart>
      ) : null}
    </>
  );
}

function showComponents(data: IPledgesByFeatureSnapshot) {
  return (
    <>
      <FeaturesTable data={data}></FeaturesTable>
      <TotalsChart totals={data.totals}></TotalsChart>
    </>
  );
}
