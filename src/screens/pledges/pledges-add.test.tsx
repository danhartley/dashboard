import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPledge from "src/screens/pledges/pledges-add";

describe("The pledges creation and update screen", () => {
  test("has valid add action", async () => {
    const user = userEvent.setup();

    await render(<AddPledge></AddPledge>);

    const addBtn = screen.getByRole("button", {
      name: /Add pledge/i,
    });

    expect(screen.getByText(/Add pledge/i)).toBeInTheDocument();

    await user.click(addBtn);

    expect(
      screen.getByDisplayValue(/The same text every time…/i)
    ).toBeInTheDocument();

    const deleteBtn = screen.getByRole("button", {
      name: /Delete/i,
    });

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();

    await user.click(deleteBtn);

    expect(await screen.queryByText(/Delete/i)).not.toBeInTheDocument();
  });
});
