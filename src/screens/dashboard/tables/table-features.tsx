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
      className="w-11/12 text-xs sm:text-base mb-16"
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
          className={`${css} text-green-800 w-1/5 after:content-['✓'] md:after:content-['honouring']`}
        >
          <span className="hidden">for accessibility</span>
        </th>
        <th
          className={`${css} text-pink-800 w-1/5 after:content-['✗'] md:after:content-['breaking']`}
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
        <th className="text-green-800 font-normal">{totals.honouring}</th>
        <th className="text-pink-800 font-normal">{totals.breaking}</th>
      </tr>
    </tfoot>
  );
};
