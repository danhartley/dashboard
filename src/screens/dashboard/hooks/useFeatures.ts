import { useFeatureBase } from "./base";

export const useFeaturesWithTotals = ({ source, snapshotId }) => {
  return useFeatureBase(snapshotId, source).snapshot;
};
