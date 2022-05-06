import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import Layout from "src/screens/layout/layout";

jest.mock("src/screens/dashboard/hooks/useSnapshots", () => ({
  useSnapshots: jest.fn(),
}));

const renderDashboard = () => {
  const mockedUseSnapshots = useSnapshots as jest.Mock<any>;
  mockedUseSnapshots.mockImplementation(() => ({}));
  const queryClient = new QueryClient();
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout></Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe("Layout", () => {
  test("has a header", () => {
    renderDashboard();
    expect(screen.getByText(/Responsibility dashboard/i)).toBeInTheDocument();
  });
  // test("has a list of links", async () => {
  //   renderDashboard();
  //   expect(await screen.findByText(/RTW 1 Jan 2021/i)).toBeInTheDocument();
  // });
});
