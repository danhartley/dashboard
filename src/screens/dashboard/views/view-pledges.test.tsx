import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";
import { usePledgesWithChecklists } from "src/screens/dashboard/hooks/usePledges";
import {
  createWrapper,
  renderPledgesComponent,
  renderPledgesWithSuccess,
} from "src/screens/dashboard/tables/shared/test-helpers";

describe("The pledges checklist table", () => {
  test("shows when it is loading", async () => {
    renderPledgesComponent();
    const { result, waitFor } = renderHook(
      () => usePledgesWithChecklists({ source: "RTW", snapshotId: 1 }),
      {
        wrapper: createWrapper(),
      }
    );
    await waitFor(() => result.current.isLoading);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  test("has a title", async () => {
    renderPledgesComponent();
    await renderPledgesWithSuccess("RTW", 1);
    expect(screen.getByText(/pledges with checklists/i)).toBeInTheDocument();
  });

  describe("has a pledge column", () => {
    test("with a table header", async () => {
      renderPledgesComponent();
      await renderPledgesWithSuccess("RTW", 1);
      expect(screen.getByRole("columnheader", { name: "Pledge" })).toBeTruthy();
    });

    describe("which when clicked", () => {
      test("shows the related pledge checklsit in a new row", async () => {
        const user = userEvent.setup();
        renderPledgesComponent();
        await renderPledgesWithSuccess("RTW", 1);
        const button = screen.getByRole("button", {
          name: /We pledge that all decisions will be explainable, so that they can be verified./i,
        });
        await user.click(button);
        expect(
          screen.getByText(
            /Explain each methodology in detail on the website./i
          )
        ).toBeInTheDocument();
        const row = screen
          .getByText(
            /We pledge that all decisions will be explainable, so that they can be verified./i
          )
          .closest("tr");
        expect(
          within(row).getByText(
            /We pledge that all decisions will be explainable, so that they can be verified./i
          )
        ).toBeTruthy();
      });
    });
  });
});
