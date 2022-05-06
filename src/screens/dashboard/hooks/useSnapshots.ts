import { useQuery } from "react-query";

import api from "src/api/api";

export const useSnapshots = () => {
  return useQuery("snapshots", () => api.getSnapshots());
};

// export const useSnapshots = () => {
//   const snapshots = useQuery("snapshots", () => api.getSnapshots());
//   return React.useMemo(() => {
//     return snapshots;
//   },[snapshots]);
// };
