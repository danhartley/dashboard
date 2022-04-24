import { render, screen } from "@testing-library/react";

import { PledgesRow } from "./pledges";
import { PledgesRowProps } from "src/shared/types";

describe("A pledges row", () => {
  const Wrapper = ({ children }) => {
    return (
      <table>
        <tbody>{children}</tbody>
      </table>
    );
  };

  const props: PledgesRowProps = {
    source: "Human agency and oversight",
    colSpan: 3,
    pledges: [
      {
        name: "Key pledge",
        honouring: 1,
        breaking: 0,
      },
      {
        name: "Minor pledge",
        honouring: 0,
        breaking: 1,
      },
    ],
  };

  test("has pledges", () => {
    render(
      <Wrapper>
        <PledgesRow
          pledges={props.pledges}
          colSpan={props.colSpan}
          source={props.source}
        ></PledgesRow>
      </Wrapper>
    );
    expect(screen.getByText("Key pledge")).toBeTruthy();
    expect(screen.getByText("Minor pledge")).toBeTruthy();
  });
  test("and a column layout", () => {
    render(
      <Wrapper>
        <PledgesRow
          pledges={props.pledges}
          colSpan={props.colSpan}
          source={props.source}
        ></PledgesRow>
      </Wrapper>
    );
    expect(screen.getAllByRole("cell").length).toBe(1 + 3 + 3);
  });
  test("that matches its parent", () => {
    props.colSpan = 4;
    render(
      <Wrapper>
        <PledgesRow
          pledges={props.pledges}
          colSpan={props.colSpan}
          source={props.source}
        ></PledgesRow>
      </Wrapper>
    );
    expect(screen.getAllByRole("cell").length).toBe(1 + 4 + 4);
  });
});
