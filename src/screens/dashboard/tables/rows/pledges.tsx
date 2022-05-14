import { PledgeRowProps, PledgesRowProps } from "src/shared/types";

const PledgeRow = ({ pledge, colSpan }: PledgeRowProps): JSX.Element => {
  const isTrue = (state, content) => {
    const classes = state
      ? ` after:content-['${content}']`
      : " after:content-['-']";
    return classes;
  };

  const nameClasses = `${colSpan === 4 ? "w-8/12" : "w-6/12"} text-xs py-1`;

  return (
    <>
      <tr>
        <td className={nameClasses}>
          <span className="pl-4 display: inline-block">{pledge.name}</span>
        </td>
        <td className="text-xs text-center w-2/12">
          <span className={isTrue(pledge.honouring > 0, "✓")}></span>
        </td>
        <td className="text-xs text-center w-2/12">
          <span className={isTrue(pledge.breaking > 0, "✗")}></span>
        </td>
        {colSpan === 5 ? (
          <td className="text-xs text-center w-2/12"></td>
        ) : null}
      </tr>
    </>
  );
};

export const PledgesRow = ({
  pledges,
  colSpan,
  source,
}: PledgesRowProps): JSX.Element => {
  return (
    <>
      <tr>
        <td colSpan={colSpan}>
          <table
            data-table-id={source.toLowerCase() + "-pledges"}
            className="w-full table-fixed mb-2"
          >
            <tbody>
              {pledges.map((pledge) => {
                return (
                  <PledgeRow
                    key={pledge.name}
                    pledge={pledge}
                    colSpan={colSpan}
                  ></PledgeRow>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};
