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

const renderApp = () => {
  const queryClient = new QueryClient();
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe("The app", () => {
  test("renders successfully for a valud route", async () => {
    renderSnapshotsWithSuccess();
    window.history.pushState({}, "Home page", "/");
    renderApp();
    const text = await screen.findByText(/github/i);
    expect(text).toBeInTheDocument();
  });
  test("renders an error message for an unmatched route", async () => {
    renderSnapshotsWithSuccess();
    window.history.pushState({}, "Nonsense page", "/gibberish");
    renderApp();
    const title = await screen.findByText(/Nothing doing, sorry./i);
    expect(title).toBeInTheDocument();
  });
});
