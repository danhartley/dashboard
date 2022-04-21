import { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useLocation } from "react-router-dom";
import DashboardFeaturesTable from "src/screens/dashboard/tables/table-features";
import DashboardValuesTable from "src/screens/dashboard/tables/table-values";

const Dashboard = (): JSX.Element => {

  const location = useLocation();

  const [source, setSource] = useState("");
  const [snapshotId, setSnapshotId] = useState(0);

  useEffect(() => {
    const parts = decodeURI(location.pathname).split("/");
    const source = parts.length > 1 ? parts[parts.length - 2] : 'RTW';
    const snapshotId = parts.length > 2 ? parseInt(parts[parts.length - 1]) : 1; 
    setSource(source);
    setSnapshotId(snapshotId);
  }, [location]);

  const css = "border-b uppercase focus:border-slate-900 text-sm";

  return (
    <div className="container mx-auto w-4/5">
      <section className="container mx-auto max-w-4xl pt-4">
        <h2 className="text-xl mt-2 mb-4">Pledges honoured and broken</h2>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab className={`${css} mr-4`}>By feature</Tab>
            <Tab className={css}>By value</Tab>
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
          </TabPanels>
        </Tabs>
      </section>
    </div>
  );
};

export default Dashboard;
