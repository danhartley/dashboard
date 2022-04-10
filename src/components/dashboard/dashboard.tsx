import DashboardFeaturesTable from 'src/components/dashboard/tables/dashboard-features';
import DashboardValuesTable from 'src/components/dashboard/tables/dashboard-values';

const ResponsibilityDashboard = (): JSX.Element => {

    return (        
        <div className="container mx-auto w-4/5">               
            <section className="container mx-auto max-w-4xl">                        
                <h1 className="text-2xl">Facebook</h1>
                <DashboardFeaturesTable></DashboardFeaturesTable>                                            
                <DashboardValuesTable></DashboardValuesTable>                        
            </section>
        </div>
    )
};

export default ResponsibilityDashboard;
