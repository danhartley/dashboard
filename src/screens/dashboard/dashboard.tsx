import { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useParams } from "react-router-dom";
import { transformSourceName } from "src/shared/utils";
import DashboardFeaturesTable from "src/screens/dashboard/tables/table-features";
import DashboardValuesTable from "src/screens/dashboard/tables/table-values";
import DashboardPledgesTable from "src/screens/dashboard/tables/table-pledges";

const Dashboard = (): JSX.Element => {
  const [source, setSource] = useState("");
  const [snapshotId, setSnapshotId] = useState(null);

  const { name, id } = useParams<"name" | "id">();

  useEffect(() => {
    setSource(name);
    setSnapshotId(parseInt(id));
  }, [name, id]);

  const css =
    "border-b uppercase hover:text-indigo-700 focus:text-indigo-700 text-xs sm:text-sm mr-4";

  return snapshotId ? (
    <>
      <h2 className="text-xl mt-2 mb-4">{transformSourceName(source)}</h2>
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab className={css}>By principle</Tab>
          <Tab className={css}>By value</Tab>
          <Tab className={css}>Checklists</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DashboardFeaturesTable
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
            ></DashboardFeaturesTable>
          </TabPanel>
          <TabPanel>
            <DashboardValuesTable
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
            ></DashboardValuesTable>
          </TabPanel>
          <TabPanel>
            <DashboardPledgesTable
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
            ></DashboardPledgesTable>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  ) : null;
};

export default Dashboard;
