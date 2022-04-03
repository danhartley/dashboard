import local from './data';

import { AssistedTechnology, DashboardStyle, Source } from '../components/dashboard/enums';
import { IPledgesByFeatureSnapshot, IValue } from '../components/dashboard/interfaces';

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

    let data: IPledgesByFeatureSnapshot = { source, snapshot, items: [] };

    switch(source) {
        case Source.Test.toString():
            data = await local.getPledgesByFeatures({snapshot});
            break;
        default:
            data = await local.getPledgesByFeatures({snapshot});
    }

    return await data;

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
    getDashboard,
    getPledgesByFeatures,
    getPledgesByValues
};

export default api;