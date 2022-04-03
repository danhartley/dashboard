import { useQuery } from 'react-query';
import { IValue } from 'src/components/dashboard/interfaces';

import api from 'src/api/api';

const getValues = async ({source}): Promise<IValue> => {
    const data =  await api.getPledgesByValues({source});
    return data;
};

export const useValues = ({source}) => {
    const key = [{source: source}];
    return useQuery(key, () => getValues({source}), {cacheTime:0});
};