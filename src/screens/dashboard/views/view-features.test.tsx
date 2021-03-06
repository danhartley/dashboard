import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import api from "src/api/api";
import {
  createWrapper,
  renderFeaturesView,
  renderFeaturesWithSuccess,
} from "src/screens/dashboard/tables/shared/test-helpers";

describe("The pledges by features table", () => {
  test("shows when it is loading", async () => {
    renderFeaturesView();
    const { result, waitFor } = renderHook(
      () => useFeaturesWithTotals({ source: "RTW", snapshotId: 1 }),
      {
        wrapper: createWrapper(),
      }
    );
    await waitFor(() => result.current.isLoading);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  describe("has a value column", () => {
    test("with a table header", async () => {
      await renderFeaturesWithSuccess(1);
      renderFeaturesView();
      expect(
        await screen.findByRole("columnheader", { name: /principle/i })
      ).toBeTruthy();
    });

    test("and a row for each value", async () => {
      renderFeaturesView();
      const { result } = await renderFeaturesWithSuccess(1);
      const itemCount = result.current.data.items.length;
      const body = screen.getAllByRole("rowgroup")[1];
      const rowCount = within(body).getAllByRole("row").length;
      expect(itemCount).toEqual(rowCount);
    });

    describe("which when clicked", () => {
      test("shows related pledges in a new row", async () => {
        renderFeaturesView();
        await renderFeaturesWithSuccess(1);
        expect(screen.getByText("Totals")).toBeInTheDocument();
        const row = screen.getByText("Totals").closest("tr");
        expect(within(row).getByText("20")).toBeInTheDocument();
        expect(within(row).getByText("8")).toBeInTheDocument();
      });
      test("with totals for hounored and breaking pledges", async () => {
        const user = userEvent.setup();
        renderFeaturesView();
        await renderFeaturesWithSuccess(1);
        const button = screen.getByRole("button", {
          name: /Human agency and oversight/i,
        });
        await user.click(button);
        expect(
          screen.getByText(
            /We pledge to evaluate risk, so that fundamental rights are not negatively affected./i
          )
        ).toBeInTheDocument();
        const row = screen
          .getByText("Human agency and oversight")
          .closest("tr");
        expect(
          within(row).getByText("Human agency and oversight")
        ).toBeTruthy();
        expect(within(row).getAllByText(1)[0]).toBeTruthy();
        expect(within(row).getByText(2)).toBeTruthy();
      });
    });

    describe("and when clicked again", () => {
      test("hides the related pledges", async () => {
        const user = userEvent.setup();
        renderFeaturesView();
        await renderFeaturesWithSuccess(1);
        const button = screen.getByRole("button", {
          name: "Human agency and oversight",
        });
        await user.click(button);
        expect(
          screen.getByText(
            /We pledge to evaluate risk, so that fundamental rights are not negatively affected./i
          )
        ).toBeInTheDocument();
        await userEvent.click(button);
        expect(
          await screen.queryByText(
            /We pledge to evaluate risk, so that fundamental rights are not negatively affected./i
          )
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("has buttons to select format", () => {
    test("table button is selected by default and table visible", async () => {
      renderFeaturesView();
      await renderFeaturesWithSuccess(1);
      const tableButton = screen.getByRole("tab", { name: "Table" });
      expect(tableButton).toBeTruthy();
      await userEvent.click(tableButton);
      expect(await screen.findByRole("tab", { selected: true })).toEqual(
        tableButton
      );
      expect(await screen.findByRole("tabpanel")).toBeInTheDocument();
    });
    test("chart button selected when clicked and chart visible", async () => {
      renderFeaturesView();
      await renderFeaturesWithSuccess(1);
      const chartButton = screen.getByRole("tab", { name: "Chart" });
      expect(chartButton).toBeTruthy();
      await userEvent.click(chartButton);
      expect(await screen.findByRole("tab", { selected: true })).toEqual(
        chartButton
      );
      expect(await screen.findByRole("tabpanel")).toBeInTheDocument();
    });
  });
  describe("displays all views", () => {
    test("when flag showAllViews set to true", async () => {
      renderFeaturesView(true);
      await renderFeaturesWithSuccess(1);
      const panels = await screen.findAllByRole("tabpanel");
      expect(panels.length).toBe(2);
    });
  });
});

describe.skip("The pledges by features table can be mocked in the test", () => {
  test("with valid data", async () => {
    const items = [
      {
        id: 1,
        name: "Human agency and oversight",
        value: "Responsibility",
        honouring: 1,
        breaking: 2,
        pledges: [
          {
            name: "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
            honouring: 2,
            breaking: 1,
          },
          {
            name: "We pledge to enable human agency, so that users retain autonomy.",
            honouring: 0,
            breaking: 1,
          },
        ],
      },
    ];
    const expected = { source: "RTW", id: 1, items: items };
    jest.spyOn(api, "getPledgesByFeatures").mockImplementation(() => {
      return Promise.resolve(expected);
    });
    const { result, waitFor } = renderHook(
      () => useFeaturesWithTotals({ source: "RTW", snapshotId: 1 }),
      { wrapper: createWrapper() }
    );
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data.items.length).toEqual(1);
  });
  test("and null data", async () => {
    jest.spyOn(api, "getPledgesByFeatures").mockImplementation(() => {
      return Promise.resolve(null);
    });
    await renderFeaturesWithSuccess(1);
    const { getByText } = renderFeaturesView();
    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });
});
