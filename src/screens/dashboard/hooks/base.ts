import { useQuery, useQueries } from "react-query";
import { getSnapshotsWithTotals } from "src/screens/dashboard/shared/utils";

import api from "src/api/api";

export const useFeatureBase = (snapshotId: any, source: any) => {
  const results = useQueries([
    {
      queryKey: [source, snapshotId],
      queryFn: () => api.getPledgesByFeatures({ source, snapshotId })
    },
    {
      queryKey: ["snapshots"],
      queryFn: () => api.getSnapshots()
    },
  ]);

  const snapshot = results[0];

  const isSuccess = results.every((result) => result.isSuccess);

  if (isSuccess) {
    snapshot.data.snapshots = results[1].data;
  }

  return { isSuccess, snapshot };
}