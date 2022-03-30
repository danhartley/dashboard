import { useEffect, useState } from 'react';
import DashboardFeaturesTable from './tables/dashboard-features';
import DashboardValuesTable from './tables/dashboard-values';
import DashboardControls from './dashboard-controls';
import { IFeature, IValue } from './interfaces';
import { Source } from './enums';

import api from 'src/api/api';

const ResponsibilityDashboard = (): JSX.Element => {

    const [featuresData, setFeaturesData] = useState<IFeature | null>(null);
    const [ValuesData, setValuesData] = useState<IValue | null>(null);
    const [activeSnapShot, setActiveSnapShot] = useState('');

    const getData = async () => {        
        const featuresView = await api.getPledgesByFeatures({source:Source.Test, snapShot: activeSnapShot});
        // const featuresView = await api.getDashboardData({data:features});
        setFeaturesData(featuresView);
        const valuesView = await api.getPledgesByValues({source:Source.Test});
        // const valuesView = await api.getDashboardData({data:values});
        setValuesData(valuesView);
    }

    useEffect(() => {
        console.log('Got data!')
        getData();       
    }, [activeSnapShot]);

    return (        
        <>
            <div className="container mx-auto w-4/5">               
                <section className="container mx-auto max-w-4xl">                        
                    <h1 className="text-2xl">Trustworthy AI</h1>  
                    <figure className="w-full border-solid border-slate-300 border p-3 my-2">
                        {
                            !featuresData ? null :
                            <>
                            <figcaption className="mb-4"><em>{featuresData.source} Pledges By IFeature</em></figcaption>
                            <DashboardFeaturesTable data={featuresData.items}></DashboardFeaturesTable>
                            <DashboardControls snapShot={featuresData.snapShot} snapShots={featuresData.snapShots} onChange={setActiveSnapShot}></DashboardControls>
                            </>
                        }
                    </figure>
                    <figure className="w-full border-solid border-slate-300 border p-3 my-2">
                        {
                            !ValuesData ? null :
                            <>
                            <figcaption className="mb-4"><em>{ValuesData.source} Pledges By Values</em></figcaption>
                            <DashboardValuesTable data={ValuesData.items}></DashboardValuesTable>
                            {/* <DashboardControls></DashboardControls> */}
                            </>
                        }                            
                    </figure> 
                </section>       
            </div>
        </>
    )
};

export default ResponsibilityDashboard;
