import DashboardFeaturesTable from "src/screens/dashboard/tables/table-features";
import DashboardValuesTable from "src/screens/dashboard/tables/table-values";

const ResponsibilityDashboard = (): JSX.Element => {
  return (
    <div className="container mx-auto w-4/5">
      <section className="container mx-auto max-w-4xl pt-4">
        <h1 className="font-serif text-2xl mt-4 mb-6">Responsibility dashboard</h1>
        <p className="my-2">Some text</p>
        <h2 className="text-xl mt-2 mb-4">Facebook</h2>
        <DashboardFeaturesTable></DashboardFeaturesTable>
        <p className="my-2">Some more text</p>
        <DashboardValuesTable></DashboardValuesTable>
      </section>
    </div>
  );
};

export default ResponsibilityDashboard;
