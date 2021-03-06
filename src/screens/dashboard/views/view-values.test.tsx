import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";
import { useValuesWithTotals } from "src/screens/dashboard/hooks/useValues";
import {
  createWrapper,
  renderValuesView,
  renderValuesWithSuccess,
} from "src/screens/dashboard/tables/shared/test-helpers";

describe("The pledges by values table", () => {
  test("shows when it is loading", async () => {
    renderValuesView();
    const { result, waitFor } = renderHook(
      () => useValuesWithTotals({ source: "RTW", snapshotId: 1 }),
      {
        wrapper: createWrapper(),
      }
    );
    await waitFor(() => result.current.isLoading);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  test("has a title", async () => {
    renderValuesView();
    await renderValuesWithSuccess(1);
    expect(screen.getByText(/pledges by/i)).toBeInTheDocument();
  });

  describe("has a value column", () => {
    test("with a table header", async () => {
      renderValuesView();
      await renderValuesWithSuccess(1);
      expect(screen.getByRole("columnheader", { name: "Value" })).toBeTruthy();
    });
    test("and a row for each value", async () => {
      renderValuesView();
      const { result } = await renderValuesWithSuccess(1);
      const itemCount = result.current.data.items.length;
      const body = screen.getAllByRole("rowgroup")[1];
      const rowCount = within(body).getAllByRole("row").length;
      expect(itemCount).toEqual(rowCount);
    });

    describe("which when clicked", () => {
      test("shows related pledges in a new row", async () => {
        const user = userEvent.setup();
        renderValuesView();
        await renderValuesWithSuccess(1);
        const button = screen.getByRole("button", { name: "Responsibility" });
        await user.click(button);
        expect(
          screen.getByText(
            /We pledge to evaluate risk, so that fundamental rights are not negatively affected./i
          )
        ).toBeInTheDocument();
        const row = screen.getByText("Responsibility").closest("tr");
        expect(within(row).getByText("Responsibility")).toBeTruthy();
        expect(within(row).getAllByText(1)[0]).toBeTruthy();
        expect(within(row).getByText(2)).toBeTruthy();
      });
      test("with totals for hounored and breaking pledges", async () => {
        renderValuesView();
        await renderValuesWithSuccess(1);
        expect(screen.getByText("Totals")).toBeInTheDocument();
        const row = screen.getByText("Totals").closest("tr");
        expect(within(row).getByText("20")).toBeInTheDocument();
        expect(within(row).getByText("8")).toBeInTheDocument();
      });
    });

    describe("and when clicked again", () => {
      test("hides the related pledges ", async () => {
        const user = userEvent.setup();
        renderValuesView();
        await renderValuesWithSuccess(1);
        const button = screen.getByRole("button", { name: "Responsibility" });
        await user.click(button);
        expect(
          screen.getByText(
            /We pledge to evaluate risk, so that fundamental rights are not negatively affected./i
          )
        ).toBeInTheDocument();
        await user.click(button);
        expect(
          await screen.queryByText(
            /We pledge to evaluate risk, so that fundamental rights are not negatively affected./i
          )
        ).not.toBeInTheDocument();
      });
    });
  });
});
