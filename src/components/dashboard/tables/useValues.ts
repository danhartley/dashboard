import { useQuery } from 'react-query';
import { useFeatures } from './useFeatures';
import { IValue } from 'src/components/dashboard/interfaces';

import api from 'src/api/api';

export const useValues = ({source, snapshotId}) => {

    const valuesKey = [{source: source}];
    const values = useQuery(valuesKey, () => api.getPledgesByValues({source}));
    const featuresKey = [{source, snapshotId}];
    const features = useQuery('features', () => api.getPledgesByFeatures({source, snapshotId}), { enabled: Boolean(values.data) } );

    if(features.data && features.data.items.length > 0) {

        values.data.items = values.data.items.map(v => {
            const f = features.data.items.find(f => {
                return f.value === v.name
            });  
            return { 
                  ...v
                , honoured:f.honoured
                , broken:f.broken
                , pledges:f.pledges
                , features: f.id 
            };
        });
    }

    return values;
};