import client from "./api-browser-client";

const snapshots = [
  {
    id: 1,
    snapshot: "1 Jan 2020",
  },
  {
    id: 2,
    snapshot: "1 Jan 2021",
  },
  {
    id: 3,
    snapshot: "1 Jan 2022",
  },
];

const getData = async (snapshotId) => {

  const baseUrl = process.env.REACT_APP_API_URL;
  const endpoint = `${baseUrl}snapshots/${snapshotId}.json`;
  const response = await client(endpoint);

  const data = {
    ...response[0],
    snapshots
  };

  return await data;
};

// const getValues = async (snapshotId) => {

//   const baseUrl = process.env.REACT_APP_API_URL;
//   const endpoint = `${baseUrl}values/${snapshotId}.json`;
//   const response = await client(endpoint);

//   return response;
// };

// const getDashboard = (at?: AssistedTechnology) => {

//     const dashboard = {
//         type: DashboardStyle.Tabular
//     };

//     switch(at) {
//         case AssistedTechnology.ScreenReader:
//             dashboard.type = DashboardStyle.Tabular;
//             break;
//         case AssistedTechnology.Unknown:
//             dashboard.type = DashboardStyle.Visual;
//     }

//     return dashboard;
// };

const getPledgesByFeatures = async ({
  source,
  snapshotId,
}: {
  source?: string;
  snapshotId: number;
}) => {
  return getData(snapshotId);

  // let data;

  // switch(source) {
  //     case Source.Test.toString():
  //         data = getData(snapshotId);
  //         break;
  //     default:
  //         data = getData(snapshotId);
  // }

  // return data;
};

// const getPledgesByValues = async ({
//   source,
//   snapshotId,
// }: {
//   source?: string;
//   snapshotId: number;
// }) => {
//   const values = await getValues(snapshotId);

//   const data = {
//     ...values,
//     snapshots,
//   };

//   return data;
// };

const api = {
  getData,
  getPledgesByFeatures,
  // getPledgesByValues,
};

export default api;
