import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { QueryClient, QueryClientProvider } from "react-query";
import api from "src/api/api";
import DashboardFeaturesTable from "./table-features";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const renderComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardFeaturesTable source="RTW" snapshotId={1} setSnapshotId={() => 10}></DashboardFeaturesTable>
    </QueryClientProvider>
  );
};

const renderFeaturesWithSuccess = async (snapshotId) => {
  const { result, waitFor } = renderHook(
    () => useFeaturesWithTotals({ source: "RTW", snapshotId: snapshotId }),
    {
      wrapper: createWrapper(),
    }
  );
  await waitFor(() => result.current.isSuccess);
  return { result, waitFor };
};

describe("The pledges by features table", () => {
  test("shows when it is loading", async () => {
    renderComponent();
    const { result, waitFor } = renderHook(
      () => useFeaturesWithTotals({ source: "RTW", snapshotId: 1 }),
      {
        wrapper: createWrapper(),
      }
    );
    await waitFor(() => result.current.isLoading);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  test("has a title", async () => {
    renderComponent();
    const { result } = await renderFeaturesWithSuccess(1);
    expect(result.current.isSuccess).toBe(true);
    expect(screen.getByText("RTW pledges honoured and broken by feature")).toBeInTheDocument();
  });

  describe("has a value column", () => {
    test("with a table header", async () => {
      renderComponent();
      await renderFeaturesWithSuccess(1);
      expect(screen.getByRole("columnheader", { name: /feature/i })).toBeTruthy();
    });

    test("and a row for each value", async () => {
      renderComponent();
      const { result } = await renderFeaturesWithSuccess(1);
      const itemCount = result.current.data.items.length;
      const body = screen.getAllByRole("rowgroup")[1];
      const rowCount = within(body).getAllByRole("row").length;
      expect(itemCount).toEqual(rowCount);
    });

    describe("which when clicked", () => {
      test("shows related pledges in a new row", async () => {
        renderComponent();
        await renderFeaturesWithSuccess(1);
        expect(screen.getByText("Totals")).toBeInTheDocument();
        const row = screen.getByText("Totals").closest("tr");
        expect(within(row).getByText("20")).toBeInTheDocument();
        expect(within(row).getByText("8")).toBeInTheDocument();
      });
      test("with totals for hounored and broken pledges", async () => {
        const user = userEvent.setup();
        renderComponent();
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
        renderComponent();
        await renderFeaturesWithSuccess(1);
        const button = screen.getByRole("button", {
          name: "Human agency and oversight",
        });
        await user.click(button);
        expect(
          screen.getByText(
            "We pledge to evaluate risk, so that fundamental rights are not negatively affected."
          )
        ).toBeInTheDocument();
        await userEvent.click(button);
        expect(
          await screen.queryByText(
            "We pledge to evaluate risk, so that fundamental rights are not negatively affected."
          )
        ).not.toBeInTheDocument();
      });
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
        honoured: 1,
        broken: 2,
        pledges: [
          {
            name: "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
            honoured: 2,
            broken: 1,
          },
          {
            name: "We pledge to enable human agency, so that users retain autonomy.",
            honoured: 0,
            broken: 1,
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
    const { getByText } = renderComponent();
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
