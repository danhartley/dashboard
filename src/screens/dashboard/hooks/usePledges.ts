import { getPledgesWithChecklists } from "src/screens/dashboard/shared/utils";
import { useFeatureBase } from "./base";

export const usePledgesWithChecklists = ({ source, snapshotId }) => {
  const { isSuccess, snapshot } = useFeatureBase(snapshotId, source);

  if (isSuccess) {
    snapshot.data = getPledgesWithChecklists(snapshot.data);
  }

  return snapshot;
};
