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
          className="w-full text-xs sm:text-base mb-16"
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
  const css = "font-normal text-xs sm:text-sm tracking-wider uppercase pb-2";

  return (
    <thead>
      <tr>
        <th className={`w-1/12 text-left ${css}`}>
          <span>&nbsp;</span>
        </th>
        <th></th>
      </tr>
      <tr>
        <th className="w-1/12"></th>
        <th className={`w-8/12 text-left ${css}`}>
          <span className=" lg:-ml-10">Pledge</span>
        </th>
        <th className="w-3/12"></th>
      </tr>
    </thead>
  );
};

const Row = ({ pledge }: PledgeProps): JSX.Element => {
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

  let css = "text-xs mr-2 ";
  css += selected.open ? "before:content-['-']" : "before:content-['+']";

  return (
    <>
      <tr>
        <td className="w-1/12">
          <span className={css}></span>
        </td>
        <td className="w-8/12 my-2 py-2 hover:text-hover-over">
          <button
            className="text-left lg:-ml-10"
            onClick={() => handleClick(pledge.name.toLowerCase())}
          >
            {pledge.name}
          </button>
        </td>
        <td className="w-3/12">
          <span className="display-inline"></span>
        </td>
      </tr>

      {pledge.name.toLowerCase() === selected.id
        ? pledge.checklist.map((item) => {
            const css = "pl-4 display: inline-block text-xs w-8/12";

            return (
              <tr key={item.check}>
                <td className="w-1/12"></td>
                <td className={css}>{item.check}</td>
                <td className="w-3/12">
                  <span
                    className={
                      item.checked
                        ? "inline after:content-['✓']"
                        : "inline after:content-['✗']"
                    }
                  ></span>
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
