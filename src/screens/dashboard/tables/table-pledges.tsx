import { useState } from "react";
import { usePledgesWithChecklists } from "src/screens/dashboard/hooks/usePledges";
import { PledgeProps, TableProps } from "src/shared/types";
import { IPledgesWithChecklists } from "src/shared/interfaces";
import Figure from "src/screens/dashboard/tables/figure/figure";

const DashboardPledgesTable = ({
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
      <Figure title={`${data[0].source} pledges with checklists`}>
        <table
          role="tabpanel"
          aria-labelledby="table"
          data-table-id="values"
          className="w-11/12 text-xs sm:text-base"
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

export default DashboardPledgesTable;

const Header = (): JSX.Element => {
  const css = "text-xs sm:text-sm tracking-wide uppercase pb-2";

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
        <td className="my-2 py-2">
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
        <th></th>
      </tr>
    </tfoot>
  );
};
