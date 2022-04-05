import { AssistedTechnology, DashboardStyle, Source } from '../components/dashboard/enums';
import { IPledgesByFeatureSnapshot, IValue } from '../components/dashboard/interfaces';
import client from './api-browser-client';

const getData = async (snapshotId): Promise<IPledgesByFeatureSnapshot> => {

    const endpoint = `snapshots.${snapshotId}.json`;
    
    const response = await client(endpoint);

    const id = snapshotId || response[0].id;

    const snapshots = [
        {
            id: 1,
            snapshot: '23 Jan 2022'
        },
        {
            id: 2,
            snapshot: '23 Feb 2022'
        },
        {
            id: 3,
            snapshot: '23 Mar 2022'
        },
    ];

    const data = { 
          ...response.filter(d => d.id === id)[0]
          , snapshots
        // , snapshots: response.filter(d => d.items.length > 0).map(d => {
        //     return {
        //         id: d.id,
        //         snapshot: d.snapshot
        //     }
        // })
    };
    
    return await data;
};

const getValues = async () => {

    const endpoint = 'values.json';
    const response = await client(endpoint);

    return response;
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

const getPledgesByFeatures = async ({source, snapshotId} : {source:string, snapshotId: number | null} ) => {

    let data: Promise<IPledgesByFeatureSnapshot> | any;

    switch(source) {
        case Source.Test.toString():
            data = getData(snapshotId);
            break;
        default:
            data = getData(snapshotId);
    }

    return data;

};

const getPledgesByValues = ({source} : {source:string} ): Promise<IValue> => {
    return getValues();
}

const api = {
    getData,
    getDashboard,
    getPledgesByFeatures,
    getPledgesByValues
};

export default api;