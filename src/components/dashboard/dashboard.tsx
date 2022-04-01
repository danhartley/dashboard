import DashboardFeaturesTable from './tables/dashboard-features';
import DashboardValuesTable from './tables/dashboard-values';

const ResponsibilityDashboard = (): JSX.Element => {

    return (        
        <div className="container mx-auto w-4/5">               
            <section className="container mx-auto max-w-4xl">                        
                <h1 className="text-2xl">Trustworthy AI</h1>
                <DashboardFeaturesTable></DashboardFeaturesTable>                                            
                <DashboardValuesTable></DashboardValuesTable>                        
            </section>
        </div>
    )
};

export default ResponsibilityDashboard;
