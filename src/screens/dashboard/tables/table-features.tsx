import { useState } from "react";
import { PledgesRow } from "src/screens/dashboard/tables/rows/pledges";
import { IPledge, IPledgesByFeatureSnapshot } from "src/shared/interfaces";
import { TotalsProps } from "src/shared/types";

type FeatureTableProps = {
  data: IPledgesByFeatureSnapshot;
};

const FeaturesTable = ({ data }: FeatureTableProps): JSX.Element => {
  return (
    <table
      role="tabpanel"
      data-table-id="features"
      className="text-xs sm:text-base mb-16 w-full"
    >
      <Header />
      <tbody>
        {data.items.map((feature) => {
          return <Row key={feature.name} feature={feature}></Row>;
        })}
      </tbody>
      <Footer totals={data.totals} />
    </table>
  );
};

export default FeaturesTable;

const Header = (): JSX.Element => {
  const css = "font-normal text-xs sm:text-sm tracking-wider uppercase pb-2";

  return (
    <thead>
      <tr>
        <th colSpan={2}>
          <span className="hidden">for accessibility</span>
        </th>
        <th className={css} colSpan={2}>
          Pledges
        </th>
      </tr>
      <tr>
        <th className="w-1/12"></th>
        <th className={`${css} text-left w-7/12`}>
          <span className="-ml-10">Principle</span>
        </th>
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

type Feature = {
  name: string;
  honouring: number;
  breaking: number;
  pledges: IPledge[];
};

export const Row = ({ feature }: { feature: Feature }): JSX.Element => {
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

  let css = "text-xs ";
  css += selected.open ? "before:content-['-']" : "before:content-['+']";

  return (
    <>
      <tr>
        <td className="w-1/12">
          <span className={css}></span>
        </td>
        <td className="w-7/12 my-2 py-2">
          <button
            className="text-left -ml-10"
            onClick={() => handleClick(feature.name.toLowerCase())}
          >
            {feature.name}
          </button>
        </td>
        <td className={"w-2/12 my-2 text-center"}>{feature.honouring}</td>
        <td className={"w-2/12 my-2 text-center"}>{feature.breaking}</td>
      </tr>
      {feature.name.toLowerCase() === selected.id ? (
        <PledgesRow
          key={feature.name}
          pledges={feature.pledges}
          colSpan={4}
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
        <th className="font-normal">{totals.honouring}</th>
        <th className="font-normal">{totals.breaking}</th>
      </tr>
    </tfoot>
  );
};
