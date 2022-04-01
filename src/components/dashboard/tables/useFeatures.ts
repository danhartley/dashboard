import { useMutation } from 'react-query';

import api from 'src/api/api';

export const useFeatures = () => {
    const { mutateAsync } = useMutation(api.getPledgesByFeatures);
    return { mutateAsync };
};