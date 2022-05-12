import { useState } from "react";
import { usePledgesWithChecklists } from "src/screens/dashboard/hooks/usePledges";
import { PledgeProps, ViewProps, Error } from "src/shared/types";
import { IPledgesWithChecklists } from "src/shared/interfaces";
import Figure from "src/screens/dashboard/tables/figure/figure";

const PledgesView = ({ source, snapshotId, setSnapshotId }: ViewProps) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }: {
    data: IPledgesWithChecklists[];
    isLoading: boolean;
    isError: boolean;
    error: Error;
    isSuccess: boolean;
  } = usePledgesWithChecklists({ source: source, snapshotId });

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
      <Figure title="Pledges with checklists">
        <table
          role="tabpanel"
          data-table-id="values"
          className="w-11/12 text-xs sm:text-base mb-16"
        >
          <Header />
          <tbody>
            {data.map((item) => {
              return <Row key={item.pledge.name} pledge={item.pledge}></Row>;
            })}
          </tbody>
          <Footer />
        </table>
      </Figure>
    );
  }
};

export default PledgesView;

const Header = (): JSX.Element => {
  const css =
    "text-celestial font-normal text-xs sm:text-sm tracking-wider uppercase pb-2";

  return (
    <thead>
      <tr>
        <th colSpan={2} className={`text-left ${css}`}>
          Pledge
        </th>
      </tr>
    </thead>
  );
};

const Row = ({ pledge }: PledgeProps): JSX.Element => {
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
            onClick={() => handleClick(pledge.name.toLowerCase())}
          >
            {pledge.name}
          </button>
        </td>
      </tr>

      {pledge.name.toLowerCase() === selectedValue.toLowerCase()
        ? pledge.checklist.map((item) => {
            const css = "pl-4 display: inline-block text-xs";

            return (
              <tr key={item.check}>
                <td className={css}>{item.check}</td>
                <td
                  className={
                    item.checked ? "after:content-['✓']" : "after:content-['✗']"
                  }
                >
                  {item.checked}
                </td>
              </tr>
            );
          })
        : null}
    </>
  );
};

const Footer = (): JSX.Element => {
  return (
    <tfoot>
      <tr>
        <th>
          <span className="hidden">for accessibility</span>
        </th>
      </tr>
    </tfoot>
  );
};
