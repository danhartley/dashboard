import local from './data';

import { AssistedTechnology, DashboardStyle, Source } from '../components/dashboard/enums';
import { IFeature } from '../components/dashboard/interfaces';

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

const getDashboardData = async ({data, filter = (Object) => Object, map = (Object) => Object}) => {

    const _data = { ...data };

    if(filter !== undefined)
        _data.items = data.items.filter(filter);
    if(map !== undefined)
        _data.items = _data.items.map(map);

    return await _data;
};

const getPledgesByFeatures = async ({source, snapShot=null} : {source:Source, snapShot: string} ): Promise<IFeature> => {

    let data: IFeature = { source: "", snapShot: "", items: [] };

    switch(source) {
        case Source.Test:
            data = await local.getPledgesByFeatures({snapShot});
            break;
        default:
            data = await local.getPledgesByFeatures({snapShot});
    }

    return data;

};

const getPledgesByValues = ({source, snapShot=null}) => {

    let data = null;

    switch(source) {
        case source:
            data = local.getPledgesByValues({snapShot});
            break;
        default:
            data = local.getPledgesByValues({snapShot});
    }

    return data;
}

const api = {
    getDashboard,
    getDashboardData,
    getPledgesByFeatures,
    getPledgesByValues
};

export default api;