import { useMutation } from 'react-query';

import api from 'src/api/api';

export const useValues = () => {
    const { mutateAsync } = useMutation(api.getPledgesByValues);
    return { mutateAsync };
};