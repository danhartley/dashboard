import { render } from "@testing-library/react";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { useValuesWithTotals } from "src/screens/dashboard/hooks/useValues";
import { QueryClient, QueryClientProvider } from "react-query";

import DashboardFeaturesTable from "./table-features";
import DashboardValuesTable from "./table-values";

// For mocking see: https://www.youtube.com/watch?v=ZfvOHRX-FDM
// For mocking see: https://github.com/satansdeer/react-query-3-example
// And with TS see: https://klzns.github.io/how-to-use-type-script-and-jest-mocks

jest.mock("src/screens/dashboard/hooks/useFeatures", () => ({
  useFeaturesWithTotals: jest.fn(),
}));

jest.mock("src/screens/dashboard/hooks/useValues", () => ({
  useValuesWithTotals: jest.fn(),
}));

const renderFeaturesTable = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardFeaturesTable
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 10}
      ></DashboardFeaturesTable>
    </QueryClientProvider>
  );
};

const renderValuesTable = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardValuesTable
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 10}
      ></DashboardValuesTable>
    </QueryClientProvider>
  );
};

describe("Network errors", () => {
  const mockedUseFeatures = useFeaturesWithTotals as jest.Mock<any>;
  mockedUseFeatures.mockImplementation(() => ({}));

  test("can be mocked for features", async () => {
    mockedUseFeatures.mockImplementation(() => ({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: { message: "We have a problem" },
    }));

    const { getByText } = renderFeaturesTable();
    expect(getByText(/We have a problem/i)).toBeInTheDocument();
  });
});

describe("and values", () => {
  const mockedUseValues = useValuesWithTotals as jest.Mock<any>;
  mockedUseValues.mockImplementation(() => ({}));

  test("Returns error", async () => {
    mockedUseValues.mockImplementation(() => ({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: { message: "We have a problem" },
    }));

    const { getByText } = renderValuesTable();
    expect(getByText(/We have a problem/i)).toBeInTheDocument();
  });
});
