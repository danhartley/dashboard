import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import App from "./App";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const renderSnapshotsWithSuccess = async () => {
  const { result, waitFor } = renderHook(() => useSnapshots(), {
    wrapper: createWrapper(),
  });
  await waitFor(() => result.current.isSuccess);
  return { result, waitFor };
};

describe("The app", () => {
  test("unless the URL is unmatched", async () => {
    renderSnapshotsWithSuccess();

    const queryClient = new QueryClient();

    window.history.pushState({}, "Test page", "/gibberish");

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const title = await screen.findByText(/Nothing doing, sorry./i);
    expect(title).toBeInTheDocument();
  });
});
