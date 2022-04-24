import { QueryClient, QueryClientProvider } from "react-query";
import { screen, render, within } from "@testing-library/react";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import Navigation from "./navigation";

jest.mock("src/screens/dashboard/hooks/useSnapshots", () => ({
  useSnapshots: jest.fn(),
}));

const summary = [
  {
    id: 1,
    snapshot: "1 Jan 2020",
    snapshotId: 1,
    source: "RTW",
  },
  {
    id: 2,
    snapshot: "1 Jan 2021",
    snapshotId: 2,
    source: "RTW",
  },
  {
    id: 3,
    snapshot: "1 Jan 2022",
    snapshotId: 3,
    source: "RTW",
  },
  {
    id: 10,
    snapshot: "1 Jan 2021",
    snapshotId: 1,
    source: "mossy-earth",
  },
];

const renderDashboard = () => {
  const mockedUseSnapshots = useSnapshots as jest.Mock<any>;
  mockedUseSnapshots.mockImplementation(() => ({}));
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Navigation></Navigation>
    </QueryClientProvider>
  );
};

describe("Navigation", () => {
  test("has a header", () => {
    renderDashboard();
    expect(screen.getByText(/Responsibility dashboard/i)).toBeInTheDocument();
  });
  // test("has a list of links", async () => {
  //   renderDashboard();
  //   expect(await screen.findByText(/RTW 1 Jan 2021/i)).toBeInTheDocument();
  // });
});
