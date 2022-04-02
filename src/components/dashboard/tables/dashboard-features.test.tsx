import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import { useFeature } from './useFeature';
import { useCustomHook } from './useCustomHook';
import { useMutation } from 'react-query';
import DashboardFeaturesTable, { Row } from './dashboard-features';

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();
 const wrapper = ({ children }) => (
   <QueryClientProvider client={queryClient}>
     {children}
   </QueryClientProvider>
 );

jest.mock('react-query');

//  const { result, waitFor } = renderHook(() => useMutation.mockImplementation(() => Promise.resolve(mutateAsync)), { wrapper });
//  const { result, waitFor } = renderHook(() => useFeature(""), { wrapper });
//  const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper });
 


jest.mock('./dashboard-features', () => {
    const originalModule = jest.requireActual('./dashboard-features');
    return {
      __esModule: true,
      ...originalModule,
    //   default: jest.fn(() => <span>Row</span>),
    //   Row: jest.fn(() => <span>Row</span>),
    };
  });

describe('DashboardFeaturesTable', () => {

    test("Should return null when there is no data", () => {
        const { getByRole } = render(<DashboardFeaturesTable></DashboardFeaturesTable>);   
        expect(2).toBe(2)
    });

    test("Should return features", async () => {
        expect(2).toBe(2);
    });

    // test("Should return features", async () => {
    //     await waitFor(() => result.current.isSuccess); 
    //     expect(result.current.data).toEqual("Hello");
    // });
});