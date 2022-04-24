import { getValuesWithTotals } from "src/shared/utils";
import { useFeatureBase } from "./base";

export const useValuesWithTotals = ({ source, snapshotId }) => {
  const { isSuccess, snapshot } = useFeatureBase(snapshotId, source);

  if (isSuccess) {
    snapshot.data = getValuesWithTotals(snapshot.data);
  }

  return snapshot;
};
