import { useState, useEffect } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useParams } from "react-router-dom";
import { transformSourceName } from "src/shared/utils";
import FeaturesView from "src/screens/dashboard/views/view-features";
import ValuesView from "src/screens/dashboard/views/view-values";
import PledgesView from "src/screens/dashboard/views/view-pledges";

const Dashboard = (): JSX.Element => {
  const [source, setSource] = useState("");
  const [snapshotId, setSnapshotId] = useState(null);

  const { name, id = "1" } = useParams<"name" | "id">();

  useEffect(() => {
    setSource(name);
    setSnapshotId(parseInt(id));
  }, [name, id]);

  const css = `
    border-b hover:border-sky-800 focus:border-sky-800
    uppercase 
    text-sky-800 hover:text-black focus:text-black text-xs sm:text-sm 
    mr-4 tracking-wider
    `;

  return snapshotId ? (
    <main className="w-10/12 md:w-4/6 bg-red-100 p-4 min-h-full mx-auto">
      <h2 className="text-xl mb-4 font-serif italic text-wider">
        {transformSourceName(source)}
      </h2>
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab className={css}>All</Tab>
          <Tab className={css}>By principle</Tab>
          <Tab className={css}>By value</Tab>
          <Tab className={css}>Checklists</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FeaturesView
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
              showAllViews={true}
            ></FeaturesView>
            <ValuesView
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
              showAllViews={false}
            ></ValuesView>
          </TabPanel>
          <TabPanel>
            <FeaturesView
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
              showAllViews={true}
            ></FeaturesView>
          </TabPanel>
          <TabPanel>
            <ValuesView
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
            ></ValuesView>
          </TabPanel>
          <TabPanel>
            <PledgesView
              source={source}
              snapshotId={snapshotId}
              setSnapshotId={setSnapshotId}
            ></PledgesView>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  ) : null;
};

export default Dashboard;
