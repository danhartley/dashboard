import { useState } from "react";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { IPledgesByFeatureSnapshot } from "src/shared/interfaces";
import { ViewProps, Error } from "src/shared/types";
import { EViewType } from "src/shared/enums";
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

  const [target, setTarget] = useState(EViewType.table);

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
  target: EViewType,
  data: IPledgesByFeatureSnapshot
) {
  return (
    <>
      {target === EViewType.table ? (
        <FeaturesTable data={data}></FeaturesTable>
      ) : target === EViewType.chart ? (
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
