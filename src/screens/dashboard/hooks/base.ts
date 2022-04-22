import { useQuery } from "react-query";

import api from "src/api/api";

export const useFeatureBase = (snapshotId: any, source: any) => {
  
  const snapshot = useQuery(
    {
      queryKey: [source, snapshotId],
      queryFn: () => api.getPledgesByFeatures({ source, snapshotId })
    }
  );

  const isSuccess = snapshot.isSuccess;

  return { isSuccess, snapshot };
}