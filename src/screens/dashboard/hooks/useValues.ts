import { useQueries } from "react-query";

import api from "src/api/api";

export const useValues = ({ source, snapshotId = 1 }) => {
  const getValues = (source, snapshotId) => {
    return api.getPledgesByValues({ source, snapshotId });
  };

  const getFeatures = (source, snapshotId) => {
    return api.getPledgesByFeatures({ source, snapshotId });
  };

  const results = useQueries([
    {
      queryKey: ["values", snapshotId],
      queryFn: () => getValues(source, snapshotId),
    },
    {
      queryKey: ["features", snapshotId],
      queryFn: () => getFeatures(source, snapshotId),
    },
  ]);

  const isSuccess = results.every((result) => result.isSuccess);

  let values = results[0];

  if (isSuccess) {
    results[0].data.items = values.data.items.map((v) => {
      const f = results[1].data.items.find((f) => {
        return f.value === v.name;
      });
      return {
        ...v,
        honoured: f.honoured,
        broken: f.broken,
        pledges: f.pledges,
        features: f.id,
      };
    });
  }

  return values;
};
