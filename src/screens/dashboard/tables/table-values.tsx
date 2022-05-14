import { useState } from "react";
import { PledgesRow } from "src/screens/dashboard/tables/rows/pledges";
import { TotalsProps, ValueProps } from "src/shared/types";
import { IPledgesByValueSnapshot } from "src/shared/interfaces";

type ValuesTableProps = {
  data: IPledgesByValueSnapshot;
};

const ValuesTable = ({ data }: ValuesTableProps) => {
  return (
    <table
      role="tabpanel"
      data-table-id="values"
      className="text-xs sm:text-base mb-16 w-full"
    >
      <Header />
      <tbody>
        {data.items.map((value) => {
          return <Row key={value.name} value={value}></Row>;
        })}
      </tbody>
      <Footer totals={data.totals} />
    </table>
  );
};

export default ValuesTable;

const Header = () => {
  const css = "font-normal text-xs sm:text-sm tracking-wider uppercase pb-2";

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
        <th className="w-1/12"></th>
        <th className={`${css} text-left w-5/12`}>
          <span className="-ml-10">Value</span>
        </th>
        <th className={`${css} ${text} text-xs tracking-wider w-2/12`}></th>
        <th
          className={`${css} w-2/12 after:content-['✓'] md:after:content-['honouring']`}
        >
          <span className="hidden">for accessibility</span>
        </th>
        <th
          className={`${css} w-2/12 after:content-['✗'] md:after:content-['breaking']`}
        >
          <span className="hidden">for accessibility</span>
        </th>
      </tr>
    </thead>
  );
};

const Row = ({ value }: ValueProps) => {
  type RowType = {
    id?: string;
    open?: boolean;
  };
  const [selected, setSelected] = useState<RowType>({});
  const handleClick = (id) => {
    id !== selected.id
      ? setSelected({ id: id, open: !selected.open })
      : setSelected({});
  };

  let css = "text-xs w-1/12 ";
  css += selected.open ? "before:content-['-']" : "before:content-['+']";

  return (
    <>
      <tr>
        <td>
          <span className={css}></span>
        </td>
        <td className="my-2 py-2 w-5/12">
          <button
            className="text-left -ml-10"
            onClick={() => handleClick(value.name.toLowerCase())}
          >
            {value.name}
          </button>
        </td>
        <td className="my-2 text-center w-2/12">{value.features}</td>
        <td className="my-2 text-center w-2/12">{value.honouring}</td>
        <td className="my-2 text-center w-2/12">{value.breaking}</td>
      </tr>

      {value.name.toLowerCase() === selected.id ? (
        <PledgesRow
          key={value.name}
          pledges={value.pledges}
          colSpan={5}
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
          className="font-normal text-xs uppercase tracking-wider text-left pt-6"
          scope="row"
        >
          Totals
        </th>
        <th>
          <span className="hidden">for accessibility</span>
        </th>
        <th className="font-normal">{totals.honouring}</th>
        <th className="font-normal">{totals.breaking}</th>
      </tr>
    </tfoot>
  );
};
