import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import App from "./App";

const snapshots = [
  {
    id: 1,
    snapshot: "1 Jan 2020",
    snapshotId: 1,
    source: "RTW"    
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
    source: "MossyEarth",
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const renderSnapshotsWithSuccess = async () => {
  const { result, waitFor } = renderHook(
    () => useSnapshots(),
    {
      wrapper: createWrapper(),
    }
  );
  await waitFor(() => result.current.isSuccess);
  return { result, waitFor };
};

describe("The app", () => {
  test("has page title", async () => {

    renderSnapshotsWithSuccess();

    const queryClient = new QueryClient();

    window.history.pushState({}, 'Test page', "/snapshots/RTW/1");

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>,
    )
    
    const title = await screen.findByText(/Responsibility dashboard/i);
    expect(title).toBeInTheDocument();
  });
  test("unless the URL is unmatched", async () => {
    renderSnapshotsWithSuccess();

    const queryClient = new QueryClient();

    window.history.pushState({}, 'Test page', "/gibberish");

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>,
    )
    
    const title = await screen.findByText(/Nothing doing, sorry./i);
    expect(title).toBeInTheDocument();
  });
});
