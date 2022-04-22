import client from "./api-browser-client";
import {
  getSnapshotsWithTotals
} from "src/screens/dashboard/shared/utils";

type PledgeProps = {
  source?: string;
  snapshotId: number;
};

const getSnapshots = async () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const endpoint = `${baseUrl}summary`;
  const snapshots = await client(endpoint);
  return snapshots;
};

const getData = async ({ source, snapshotId }: PledgeProps) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const endpoint = `${baseUrl}snapshots/${source}/${snapshotId}`;
  const response = await client(endpoint);
  const data = Array.isArray(response) ? response[0] : response;
  return await data;
};

const getPledgesByFeatures = async ({ source, snapshotId }: PledgeProps) => {
  const data = await getData({ source, snapshotId });
  return getSnapshotsWithTotals(data);
};

const api = {
  getData,
  getPledgesByFeatures,
  getSnapshots
};

export default api;
