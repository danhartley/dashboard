import { useEffect, useState } from "react";
import { PledgesRow } from "src/screens/dashboard/tables/rows/pledges";
import { useValues } from "src/screens/dashboard/hooks/useValues";
import { total } from "src/screens/dashboard/shared/utils";
import { TotalsProps, ValueProps } from 'src/screens/dashboard/shared/types';
import { IPledgesByValueSnapshot } from 'src/screens/dashboard/shared/interfaces';
import DashboardControls from "src/screens/dashboard/dashboard-controls";

const Header = () => {
  return (
    <thead>
      <tr>
        <th colSpan={1}></th>
        <th colSpan={2}>Pledges</th>
        <th colSpan={2}>Project</th>
      </tr>
      <tr>
        <th className="w-2/5 text-left">Value</th>
        <th className="w-1/5">Honoured</th>
        <th className="w-1/5">Broken</th>
        <th className="w-1/5">Features</th>
      </tr>
    </thead>
  );
};

const Row = ({ value }: ValueProps ): JSX.Element => {
  const _colSpan = 4;

  const [selectedValue, setSelectedValue] = useState("");

  const handleClick = (e) => {
    const id = e.target.getAttribute("data-table-id");
    id !== selectedValue ? setSelectedValue(id) : setSelectedValue("");
  };

  return (
    <>
      <tr>
        <td className="py-1">
          <button
            data-table-id={value.name.toLowerCase()}
            onClick={handleClick}
          >
            {value.name}
          </button>
        </td>
        <td className="text-center">{value.honoured}</td>
        <td className="text-center">{value.broken}</td>
        <td className="text-center">{value.features}</td>
      </tr>

      {value.name.toLowerCase() === selectedValue ? (
        <PledgesRow
          key={value.name}
          pledges={value.pledges}
          colSpan={_colSpan}
          source={value.name}
        ></PledgesRow>
      ) : null}
    </>
  );
};

const Footer = ({ totals }: TotalsProps ) => {
  return (
    <tfoot>
      <tr>
        <th className="text-left pt-2" scope="row">
          Totals
        </th>
        <th>{totals.honoured}</th>
        <th>{totals.broken}</th>
        <th>{totals.features}</th>
      </tr>
    </tfoot>
  );
};

const DashboardValuesTable = (): JSX.Element => {
  type Error = {
    message?: string;
  };

  const [source] = useState<string>(process.env.REACT_APP_SERVER);
  const [snapshotId, setSnapshotId] = useState(1);
  const [totals, setTotals] = useState({ honoured: 0, broken: 0, features: 0 });
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
  } = useValues({ source: source, snapshotId });

  useEffect(() => {
    if (!data) return;

    const totals = {
      honoured: data.items.map((i) => i.honoured).reduce(total, 0),
      broken: data.items.map((i) => i.broken).reduce(total, 0),
      features: data.items.map((i) => i.features).reduce(total, 0),
    };
    setTotals(totals);
  }, [data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isSuccess) {
    return (
      <figure className="w-full border-solid border-slate-300 border p-3 my-2">
        <figcaption className="mb-4">
          <em>{data.source} Pledges By Values</em>
        </figcaption>
        <table
          role="tabpanel"
          aria-labelledby="table"
          data-table-id="values"
          className="w-4/5 text-xs sm:text-base"
        >
          <Header />
          <tbody>
            {data.items.map((value) => {
              return <Row key={value.name} value={value}></Row>;
            })}
          </tbody>
          <Footer totals={totals} />
        </table>
        <DashboardControls
          namespace="values"
          snapshotId={data.id}
          snapshots={data.snapshots}
          onChange={setSnapshotId}
        ></DashboardControls>
      </figure>
    );
  }
};

export default DashboardValuesTable;
