import { useQuery } from 'react-query';
import { IPledgesByFeatureSnapshot } from 'src/components/dashboard/interfaces';

import api from 'src/api/api';

export const useFeatures = ({source, snapshotId}) => {
    return useQuery(['snapshot', snapshotId], () => api.getPledgesByFeatures({source, snapshotId}));
};