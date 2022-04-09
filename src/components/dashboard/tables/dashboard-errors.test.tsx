import { render } from '@testing-library/react';
import { useFeatures } from './useFeatures';
import { useValues } from './useValues';
import { QueryClient, QueryClientProvider } from 'react-query';

import DashboardFeaturesTable from './dashboard-features';
import DashboardValuesTable from './dashboard-values';

// For mocking see: https://www.youtube.com/watch?v=ZfvOHRX-FDM
// For mocking see: https://github.com/satansdeer/react-query-3-example
// And with TS see: https://klzns.github.io/how-to-use-type-script-and-jest-mocks

jest.mock('./useFeatures', () => ({
    useFeatures: jest.fn(),
}));

jest.mock('./useValues', () => ({
    useValues: jest.fn(),
}));

const renderFeaturesTable = () => {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}><DashboardFeaturesTable></DashboardFeaturesTable></QueryClientProvider>);
};

const renderValuesTable = () => {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}><DashboardValuesTable></DashboardValuesTable></QueryClientProvider>);
};

describe('Network errors', () => {

    const mockedUseFeatures = useFeatures as jest.Mock<any>;
    mockedUseFeatures.mockImplementation(() => ({}));

    test('can be mocked for features', async () => {         
        mockedUseFeatures.mockImplementation(() => ({
            data: null,
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: { message: "We have a problem" },
        }));
        
        const { getByText } = renderFeaturesTable();
        expect(getByText(/We have a problem/i)).toBeInTheDocument();
    });
});

describe('and values', () => {

    const mockedUseValues = useValues as jest.Mock<any>;
    mockedUseValues.mockImplementation(() => ({}));

    test('Returns error', async () => {         
        mockedUseValues.mockImplementation(() => ({
            data: null,
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: { message: "We have a problem" },
        }));
        
        const { getByText } = renderValuesTable();
        expect(getByText(/We have a problem/i)).toBeInTheDocument();
    });
});