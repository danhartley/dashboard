import { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useParams } from "react-router-dom";
import DashboardFeaturesTable from "src/screens/dashboard/tables/table-features";
import DashboardValuesTable from "src/screens/dashboard/tables/table-values";

const Dashboard = (): JSX.Element => {

  const [source, setSource] = useState("");
  const [snapshotId, setSnapshotId] = useState(null);

  const { name, id } = useParams<'name' | 'id'>();

  useEffect(() => {
    setSource(name); 
    setSnapshotId(parseInt(id));
  }, [name, id]);
  
  const css = "border-b uppercase focus:border-slate-900 text-sm";

  return (
    snapshotId ?
    <div className="container mx-auto w-4/5">
      <section className="container mx-auto max-w-4xl pt-4">
        <h2 className="text-xl mt-2 mb-4">Honouring and breaking pledges</h2>
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
    </div> : <div>No valid snapshotId</div>
  );
};

export default Dashboard;
