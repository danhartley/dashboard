import local from './data';

import { AssistedTechnology, DashboardStyle, Source } from '../components/dashboard/enums';
import { IPledgesByFeatureSnapshot, IValue } from '../components/dashboard/interfaces';
import client from './api-browser-client';

const getData = async (snapshot): Promise<IPledgesByFeatureSnapshot> => {

    const endpoint = 'snapshots.json';
    const response = await client(endpoint);    

    console.log('snapshot', snapshot)
    
    const _snapshot = snapshot || response[0].snapshot;

    const data = { 
          ...response.filter(d => d.snapshot === _snapshot)[0]
        , snapshots: response.filter(d => d.items.length > 0).map(d => d.snapshot)
    };
    
    return await data;
};

const getDashboard = (at?: AssistedTechnology) => {
    
    const dashboard = {
        type: DashboardStyle.Tabular
    };

    switch(at) {
        case AssistedTechnology.ScreenReader:
            dashboard.type = DashboardStyle.Tabular;
            break;
        case AssistedTechnology.Unknown:
            dashboard.type = DashboardStyle.Visual;
    }

    return dashboard;
};

const getPledgesByFeatures = async ({source, snapshot} : {source:string, snapshot: string | null} ) => {

    let data: Promise<IPledgesByFeatureSnapshot> | any;

    switch(source) {
        case Source.Test.toString():
            data = getData(snapshot);
            break;
        default:
            data = getData(snapshot);
    }

    return data;

};

const getPledgesByValues = ({source} : {source:string} ): Promise<IValue> => {

    let data = null;

    switch(source) {
        case Source.Test.toString():
            data = local.getPledgesByValues();
            break;
        default:
            data = local.getPledgesByValues();
    }

    return data;
}

const api = {
    getData,
    getDashboard,
    getPledgesByFeatures,
    getPledgesByValues
};

export default api;