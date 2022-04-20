import { useState } from "react";
import { PledgesRow } from "src/screens/dashboard/tables/rows/pledges";
import { useValuesWithTotals } from "src/screens/dashboard/hooks/useValues";
import { TotalsProps, ValueProps, TableProps } from 'src/screens/dashboard/shared/types';
import { IPledgesByValueSnapshot } from 'src/screens/dashboard/shared/interfaces';

import TableControls from "src/screens/dashboard/tables/table-controls";

const Header = () => {
  return (

    <thead>
      <tr>
        <th colSpan={1}></th>
        <th className="text-xs tracking-wide	uppercase" colSpan={2}>Pledges</th>
        <th className="text-xs tracking-wide	uppercase" colSpan={2}>Project</th>
      </tr>
      <tr>
        <th className="pb-2 text-left text-xs tracking-wide	uppercase w-2/5">Value</th>
        <th className="text-xs tracking-wide uppercase w-1/5 after:content-['✓'] md:after:content-['Honoured']"></th>
        <th className="text-xs tracking-wide uppercase w-1/5 after:content-['✗'] md:after:content-['Broken']"></th>
        <th className="text-xs tracking-wide uppercase w-1/5">Features</th>
      </tr>
    </thead>
  );
};

const Row = ({ value }: ValueProps ) => {

  const [selectedValue, setSelectedValue] = useState("");

  const handleClick = id => {
    id !== selectedValue ? setSelectedValue(id) : setSelectedValue("");
  };

  return (
    <>
      <tr>
        <td className="my-2 py-2">
          <button
            onClick={() => handleClick(value.name.toLowerCase())}
          >
            {value.name}
          </button>
        </td>
        <td className="my-2 text-center">{value.honoured}</td>
        <td className="my-2 text-center">{value.broken}</td>
        <td className="my-2 text-center">{value.features}</td>
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

const Footer = ({ totals }: TotalsProps ) => {
  return (
    <tfoot>
      <tr>
        <th className="text-xs uppercase tracking-wide text-left pt-6" scope="row">
          Totals
        </th>
        <th>{totals.honoured}</th>
        <th>{totals.broken}</th>
        <th>{totals.features}</th>
      </tr>
    </tfoot>
  );
};

const DashboardValuesTable = ({source, snapshotId, setSnapshotId}: TableProps) => {
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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isSuccess) {
    return (
      <figure className="w-full border-solid border-slate-900 dark:border-slate-50 border-4 rounded-md p-3 my-2">
        <figcaption className="font-serif mb-4">
          <em>{data.source} pledges honoured and broken by value</em>
        </figcaption>
        <table
          role="tabpanel"
          aria-labelledby="table"
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
        <TableControls
          namespace="values"
          snapshotId={data.id}
          snapshots={data.snapshots}
          onChange={setSnapshotId}
        ></TableControls>
      </figure>
    );
  }
};

export default DashboardValuesTable;
