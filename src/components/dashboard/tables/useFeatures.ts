import { useQuery } from 'react-query';
import { IPledgesByFeatureSnapshot } from 'src/components/dashboard/interfaces';

import api from 'src/api/api';

const getfeatures = async ({source, snapshot}): Promise<IPledgesByFeatureSnapshot> => {
    const data =  await api.getPledgesByFeatures({source, snapshot});
    return data;
};

export const useFeatures = ({source, snapshot}) => {
    const key = [{source: source, snapshot: snapshot}];
    return useQuery(key, () => getfeatures({source, snapshot}));
};