import { useQuery } from 'react-query';

export function useCustomHook() {
    return useQuery('customHook', () => 'Hello');
};