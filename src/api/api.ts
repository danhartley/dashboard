import client from "./api-browser-client";

type PledgeProps = {
  source?: string;
  snapshotId: number;
}

const snapshots = [
  {
    id: 1,
    snapshot: "1 Jan 2020",
    source: "Facebook"
  },
  {
    id: 2,
    snapshot: "1 Jan 2021",
    source: "Facebook"
  },
  {
    id: 3,
    snapshot: "1 Jan 2022",
    source: "Facebook"
  },
  {
    id: 4,
    snapshot: "1 Feb 2022",
    source: "Google"
  },
];

const getData = async ({
  source,
  snapshotId,
}: PledgeProps) => {

  const baseUrl = process.env.REACT_APP_API_URL;
  const endpoint = `${baseUrl}snapshots/${snapshotId}?source=${source}`;
  const response = await client(endpoint);

  const data = {
    ...response,
    snapshots: snapshots.filter(s => s.source === source)
  };

  return await data;
};

const getPledgesByFeatures = async ({
  source,
  snapshotId,
}: PledgeProps) => {
  return getData({source, snapshotId});
};

const api = {
  getData,
  getPledgesByFeatures
};

export default api;
