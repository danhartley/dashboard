import { useState } from "react";
import { ViewProps } from "src/shared/types";
import { useValuesWithTotals } from "src/screens/dashboard/hooks/useValues";
import { IPledgesByValueSnapshot } from "src/shared/interfaces";
import Figure from "src/screens/dashboard/tables/figure/figure";
import TableControls from "src/screens/dashboard/tables/table-controls";
import TotalsChart from "src/screens/dashboard/charts/chart-features";
import ValuesTable from "src/screens/dashboard//tables/table-values";
import { ViewType } from "src/shared/types";

const ValuesView = ({
  source,
  snapshotId,
  setSnapshotId,
  showAllViews = false,
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
    data: IPledgesByValueSnapshot;
    isLoading: boolean;
    isError: boolean;
    error: Error;
    isSuccess: boolean;
  } = useValuesWithTotals({ source: source, snapshotId });

  const [target, setTarget] = useState<ViewType>("table");

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
      <Figure title="Pledges by value">
        {showAllViews
          ? showComponents(data)
          : ShowComponentsConditionally(target as ViewType, data)}
        <TableControls
          namespace="values"
          snapshotId={data.snapshotId}
          snapshots={data.snapshots.filter((s) => s.source === data.source)}
          onChange={setSnapshotId}
          target={target as ViewType}
          setTarget={setTarget}
          showSelector={false}
        ></TableControls>
      </Figure>
    );
  }
};

export default ValuesView;

function ShowComponentsConditionally(
  target: ViewType,
  data: IPledgesByValueSnapshot
) {
  return (
    <>
      {target === "table" ? (
        <ValuesTable data={data}></ValuesTable>
      ) : target === "chart" ? (
        <TotalsChart totals={data.totals}></TotalsChart>
      ) : null}
    </>
  );
}

function showComponents(data: IPledgesByValueSnapshot) {
  return (
    <>
      <ValuesTable data={data}></ValuesTable>
      <TotalsChart totals={data.totals}></TotalsChart>
    </>
  );
}
