import nock from 'nock';
import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import { useFeatures } from './useFeatures';
import api from 'src/api/api';
import DashboardFeaturesTable from './dashboard-features';

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { IPledgesByFeatureSnapshot } from '../interfaces';

 const createWrapper = () => {
    const queryClient = new QueryClient()
    return ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('DashboardFeaturesTable', () => {    
    test.skip("Should return 7 features (items) for feature for local Test data", async () => {
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: null}), { wrapper: createWrapper() });


        // const expectation = nock('')
        // .get('snapshots.json')
        // .reply(200, {
        //   answer: 42
        // });
        
        await waitFor(() => result.current.isSuccess);
        // expect(result.current.data.items.length).toEqual(7);

        expect(result.current.data).toEqual({answer: 42});
    });
    test("Should return 1 feature (item) for feature for mocked data", async () => {
        const items = [{
            id: 1,
            name: 'Human agency and oversight',
            value: 'Responsibility',
            honoured: 1,
            broken: 2,
            pledges: [
                {
                    name: "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
                    honoured: 2,
                    broken: 1
                },
                {
                    "name": "We pledge to enable human agency, so that users retain autonomy.",
                    "honoured": 0,
                    "broken": 1
                },
        ]
        }];
        const expected:IPledgesByFeatureSnapshot = {source:'Test', snapshot: "", items: items};
        jest.spyOn(api, "getPledgesByFeatures").mockImplementation(() => {
            return Promise.resolve(expected)
          });
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: null}), { wrapper: createWrapper() });        
        await waitFor(() => result.current.isSuccess);
        expect(result.current.data.items.length).toEqual(1);
    });
    test("Should handle no data for mocked data", async () => {
        jest.spyOn(api, "getPledgesByFeatures").mockImplementation(() => {
            return Promise.resolve(null)
          });
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: null}), { wrapper: createWrapper() });        
        await waitFor(() => result.current.isSuccess);
        const queryClient = new QueryClient();
        const { getByText } = render(<QueryClientProvider client={queryClient}><DashboardFeaturesTable></DashboardFeaturesTable></QueryClientProvider>);
        expect(getByText('Loading...')).toBeInTheDocument();
    });
});