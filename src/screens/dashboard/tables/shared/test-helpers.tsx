import { render, screen, within } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { useFeaturesWithTotals } from "src/screens/dashboard/hooks/useFeatures";
import { useValuesWithTotals } from "src/screens/dashboard/hooks/useValues";
import { usePledgesWithChecklists } from "src/screens/dashboard/hooks/usePledges";

import FeaturesView from "src/screens/dashboard/views/view-features";
import ValuesView from "src/screens/dashboard/views/view-values";
import PledgesView from "src/screens/dashboard/views/view-pledges";

export const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const renderFeaturesView = (showAllViews = false) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <FeaturesView
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 1}
        showAllViews={showAllViews}
      ></FeaturesView>
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

export const renderValuesView = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ValuesView
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 1}
      ></ValuesView>
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
      <PledgesView
        source="RTW"
        snapshotId={1}
        setSnapshotId={() => 1}
      ></PledgesView>
    </QueryClientProvider>
  );
};

export const renderPledgesWithSuccess = async (source = "RTW", snapshotId) => {
  const { result, waitFor } = renderHook(
    () => usePledgesWithChecklists({ source: source, snapshotId: snapshotId }),
    {
      wrapper: createWrapper(),
    }
  );
  await waitFor(() => result.current.isSuccess);
  return { result, waitFor };
};
