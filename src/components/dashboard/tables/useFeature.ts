import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { IFeature } from 'src/components/dashboard/interfaces';

import api from 'src/api/api';

const getfeatures = async ({source, snapShot}) => {
    const data =  await api.getPledgesByFeatures({source, snapShot});
    console.log('query data:', data);
    return data;
};

export const useFeature = ({source, snapShot}) => {
    const key = [{source: source, snapShot: snapShot}];
    console.log('key', key);
    return useQuery(key, () => getfeatures({source, snapShot}), {cacheTime:0});
};

// export const useFeature = () => {
//     const { mutateAsync } = useMutation(api.getPledgesByFeatures);
//     return { mutateAsync };
// };