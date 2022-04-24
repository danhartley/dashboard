import { render, screen, within } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { useValuesWithTotals } from "src/screens/dashboard/hooks/useValues";
import { usePledgesWithChecklists } from "src/screens/dashboard/hooks/usePledges";

import DashboardFeaturesTable from "src/screens/dashboard/tables/table-features";
import DashboardValuesTable from "src/screens/dashboard/tables/table-values";
import DashboardPledgesTable from "src/screens/dashboard/tables/table-pledges";

export const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const renderFeaturesComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardFeaturesTable
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 1}
      ></DashboardFeaturesTable>
    </QueryClientProvider>
  );
};

export const renderFeaturesWithSuccess = async (snapshotId) => {
  const { result, waitFor } = renderHook(
    () => useFeaturesWithTotals({ source: "RTW", snapshotId: snapshotId }),
    {
      wrapper: createWrapper(),
    }
  );
  await waitFor(() => result.current.isSuccess);
  return { result, waitFor };
};

export const renderValuesComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardValuesTable
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 1}
      ></DashboardValuesTable>
    </QueryClientProvider>
  );
};

export const renderValuesWithSuccess = async (snapshotId) => {
  const { result, waitFor } = renderHook(
    () => useValuesWithTotals({ source: "RTW", snapshotId: snapshotId }),
    {
      wrapper: createWrapper(),
    }
  );
  await waitFor(() => result.current.isSuccess);
  return { result, waitFor };
};

export const renderPledgesComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardPledgesTable
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 1}
      ></DashboardPledgesTable>
    </QueryClientProvider>
  );
};

export const renderPledgesWithSuccess = async (source= "RTW", snapshotId) => {
  const { result, waitFor } = renderHook(
    () => usePledgesWithChecklists({ source: source, snapshotId: snapshotId }),
    {
      wrapper: createWrapper(),
    }
  );
  await waitFor(() => result.current.isSuccess);
  return { result, waitFor };
};