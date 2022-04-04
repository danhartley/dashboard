import { render, screen, within, fireEvent } from '@testing-library/react';
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
    test("Should return 7 features (items) for feature for January", async () => {
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: '23 Jan 2022'}), { wrapper: createWrapper() });
        await waitFor(() => result.current.isSuccess);
        expect(result.current.data.items.length).toEqual(7);
    });
    test("Should return 7 features (items) for feature for February", async () => {
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: '23 Feb 2022'}), { wrapper: createWrapper() });
        await waitFor(() => result.current.isSuccess);
        expect(result.current.data.items.length).toEqual(7);
    });
    test("Should return 0 features (items) for feature for March", async () => {
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: '23 Mar 2022'}), { wrapper: createWrapper() });
        await waitFor(() => result.current.isSuccess);
        expect(result.current.data.items.length).toEqual(0);
    });
    test("Should return correct honoured and broken totals for January snapshot", async () => {
        const queryClient = new QueryClient();
        const { getByText } = render(<QueryClientProvider client={queryClient}><DashboardFeaturesTable></DashboardFeaturesTable></QueryClientProvider>);
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: '23 Jan 2022'}), { wrapper: createWrapper() });
        await waitFor(() => result.current.isSuccess);
        expect(getByText('Totals')).toBeInTheDocument();        
        const row = screen.getByText('Totals').closest("tr");
        expect(within(row).getByText('20')).toBeInTheDocument();
        expect(within(row).getByText('8')).toBeInTheDocument();
    });
    test("Should return 1 feature (item) for feature for in test mocked data", async () => {
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
    test("Should handle no data for in test mocked data", async () => {
        jest.spyOn(api, "getPledgesByFeatures").mockImplementation(() => {
            return Promise.resolve(null)
          });
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: null}), { wrapper: createWrapper() });        
        await waitFor(() => result.current.isSuccess);
        const queryClient = new QueryClient();
        const { getByText } = render(<QueryClientProvider client={queryClient}><DashboardFeaturesTable></DashboardFeaturesTable></QueryClientProvider>);
        expect(getByText('Loading...')).toBeInTheDocument();
    });
    test("Should handle error for in test mocked data", async () => {
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshot: 'Bad date'}), { wrapper: createWrapper() });        
        console.log(result.current)
        await waitFor(() => result.current.isLoading && result.current.data === undefined);
        const queryClient = new QueryClient();
        const { getByText } = render(<QueryClientProvider client={queryClient}><DashboardFeaturesTable></DashboardFeaturesTable></QueryClientProvider>);
        expect(getByText('Loading...')).toBeInTheDocument();
    });
});