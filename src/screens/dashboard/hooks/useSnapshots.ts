import { useQuery } from "react-query";

import api from "src/api/api";

export const useSnapshots = () => {
  return useQuery("snapshots", () => api.getSnapshots());
};
