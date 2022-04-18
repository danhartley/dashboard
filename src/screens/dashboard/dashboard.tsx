import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import DashboardFeaturesTable from "src/screens/dashboard/tables/table-features";
import DashboardValuesTable from "src/screens/dashboard/tables/table-values";

const Dashboard = (): JSX.Element => {

  const [source, setSource] = useState('Facebook');

  const css = "border-b uppercase focus:border-slate-900 text-sm";

  return (
    <div className="container mx-auto w-4/5">
      <section className="container mx-auto max-w-4xl pt-4">
        <h1 className="font-serif text-3xl mt-4 mb-6">Responsibility dashboard</h1>
        <p className="my-2">Some text</p>
        <h2 className="text-xl mt-2 mb-4">Pledges honoured and broken</h2>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab className={`${css} mr-4`}>By feature</Tab>
            <Tab className={css}>By value</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><DashboardFeaturesTable source={source}></DashboardFeaturesTable></TabPanel>
            <TabPanel><DashboardValuesTable source={source}></DashboardValuesTable></TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </div>
  );
};

export default Dashboard;
