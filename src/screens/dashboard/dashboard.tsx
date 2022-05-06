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

  const { name, id = "1" } = useParams<"name" | "id">();

  useEffect(() => {
    setSource(name);
    setSnapshotId(parseInt(id));
  }, [name, id]);

  const css =
    "border-b hover:border-orange-700 focus:border-orange-700 uppercase hover:text-orange-700 focus:text-orange-700 text-xs sm:text-sm mr-4";

  return snapshotId ? (
    <main className="w-4/4 lg:w-3/4">
      <h2 className="text-xl mb-4">{transformSourceName(source)}</h2>
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
    </main>
  ) : null;
};

export default Dashboard;
