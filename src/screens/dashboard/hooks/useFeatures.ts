import { useQuery } from "react-query";
import { getSnapshotsWithTotals } from 'src/screens/dashboard/shared/utils';

import api from "src/api/api";

// export const useFeatures = ({ source, snapshotId }) => {
//   return useQuery(["snapshot", snapshotId], () =>
//     api.getPledgesByFeatures({ source, snapshotId })
//   );
// };

export const useFeaturesWithTotals = ({ source, snapshotId }) => {
  
  const result = useQuery(["snapshot", snapshotId], () =>
    api.getPledgesByFeatures({ source, snapshotId })
  );

  if(result.isSuccess) {
    result.data = getSnapshotsWithTotals(result.data);
  }

  return result;
};