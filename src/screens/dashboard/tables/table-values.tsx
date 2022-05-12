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
      className="w-11/12 text-xs sm:text-base mb-16"
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
  const css =
    "text-celestial font-normal text-xs sm:text-sm tracking-wider uppercase pb-2";

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
          className={`${css} text-honouring w-1/5 after:content-['✓'] md:after:content-['honouring']`}
        >
          <span className="hidden">for accessibility</span>
        </th>
        <th
          className={`${css} text-breaking w-1/5 after:content-['✗'] md:after:content-['breaking']`}
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
        <td className="my-2 py-2 hover:text-sun">
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
          className="text-celestial font-normal text-xs uppercase tracking-wider text-left pt-6"
          scope="row"
        >
          Totals
        </th>
        <th>
          <span className="hidden">for accessibility</span>
        </th>
        <th className="text-honouring font-normal">{totals.honouring}</th>
        <th className="text-breaking font-normal">{totals.breaking}</th>
      </tr>
    </tfoot>
  );
};
