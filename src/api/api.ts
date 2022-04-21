import client from "./api-browser-client";

type PledgeProps = {
  source?: string;
  snapshotId: number;
};

const snapshots = [
  {
    id: 1,
    snapshot: "1 Jan 2020",
    snapshotId: 1,
    source: "RTW"    
  },
  {
    id: 2,
    snapshot: "1 Jan 2021",
    snapshotId: 2,
    source: "RTW",
  },
  {
    id: 3,
    snapshot: "1 Jan 2022",
    snapshotId: 3,
    source: "RTW",
  },
  {
    id: 10,
    snapshot: "1 Jan 2021",
    snapshotId: 1,
    source: "MossyEarth",
  },
];

const getSnapshots = async () => {
  // const baseUrl = process.env.REACT_APP_API_URL;
  // const endpoint = `${baseUrl}snapshots/summary`;
  // const response = client(endpoint);
  // return response;
  return snapshots;
};

const getData = async ({ source, snapshotId }: PledgeProps) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const endpoint = `${baseUrl}snapshots/${source}/${snapshotId}`;
  const response = await client(endpoint);

  const data = {
    ...response,
  };

  return await data;
};

const getPledgesByFeatures = async ({ source, snapshotId }: PledgeProps) => {
  return getData({ source, snapshotId });
};

const api = {
  getData,
  getPledgesByFeatures,
  getSnapshots
};

export default api;
