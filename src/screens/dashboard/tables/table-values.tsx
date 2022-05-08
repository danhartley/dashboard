import { useState } from "react";
import { PledgesRow } from "src/screens/dashboard/tables/rows/pledges";
import { useValuesWithTotals } from "src/screens/dashboard/hooks/useValues";
import { TotalsProps, ValueProps, TableProps } from "src/shared/types";
import { IPledgesByValueSnapshot } from "src/shared/interfaces";
import Figure from "src/screens/dashboard/tables/figure/figure";
import TableControls from "src/screens/dashboard/tables/table-controls";
import FeaturesChart from "src/screens/dashboard/charts/chart-features";

const DashboardValuesTable = ({
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
    data: IPledgesByValueSnapshot;
    isLoading: boolean;
    isError: boolean;
    error: Error;
    isSuccess: boolean;
  } = useValuesWithTotals({ source: source, snapshotId });

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
      <Figure title="Pledges by value">
        {target === "table" ? (
          <table
            role="tabpanel"
            data-table-id="values"
            className="w-11/12 text-xs sm:text-base"
          >
            <Header />
            <tbody>
              {data.items.map((value) => {
                return <Row key={value.name} value={value}></Row>;
              })}
            </tbody>
            <Footer totals={data.totals} />
          </table>
        ) : target === "chart" ? (
          <FeaturesChart totals={data.totals}></FeaturesChart>
        ) : null}
        <TableControls
          namespace="values"
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

export default DashboardValuesTable;

const Header = () => {
  const css =
    "text-sky-800 font-normal text-xs sm:text-sm tracking-wider uppercase pb-2";

  const text = `after:content-['#'] md:after:content-['Principles']`;

  return (
    <thead>
      <tr>
        <th colSpan={1}>
          <span className="hidden">for accessibility</span>
        </th>
        <th className={css} colSpan={1}>
          <span className="hidden">for accessibility</span>
        </th>
        <th className={css} colSpan={2}>
          Pledges
        </th>
      </tr>
      <tr>
        <th className={`${css} text-left w-2/5`}>Value</th>
        <th className={`${css} ${text} text-xs tracking-wider w-1/5`}></th>
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

const Row = ({ value }: ValueProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleClick = (id) => {
    id !== selectedValue ? setSelectedValue(id) : setSelectedValue("");
  };

  return (
    <>
      <tr>
        <td className="my-2 py-2 hover:text-orange-800">
          <button
            className="text-left"
            onClick={() => handleClick(value.name.toLowerCase())}
          >
            {value.name}
          </button>
        </td>
        <td className="my-2 text-center">{value.features}</td>
        <td className="my-2 text-center">{value.honouring}</td>
        <td className="my-2 text-center">{value.breaking}</td>
      </tr>

      {value.name.toLowerCase() === selectedValue ? (
        <PledgesRow
          key={value.name}
          pledges={value.pledges}
          colSpan={4}
          source={value.name}
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
          className="text-sky-800 font-normal text-xs uppercase tracking-wider text-left pt-6"
          scope="row"
        >
          Totals
        </th>
        <th>
          <span className="hidden">for accessibility</span>
        </th>
        <th className="text-sky-800 font-normal">{totals.honouring}</th>
        <th className="text-sky-800 font-normal">{totals.breaking}</th>
      </tr>
    </tfoot>
  );
};
