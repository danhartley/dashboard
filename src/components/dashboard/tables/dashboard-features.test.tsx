import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks'
import { useFeatures } from './useFeatures';
import { QueryClient, QueryClientProvider } from 'react-query';
import api from 'src/api/api';
import DashboardFeaturesTable from './dashboard-features';

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        )
};
    
const renderComponent = () => {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}><DashboardFeaturesTable></DashboardFeaturesTable></QueryClientProvider>);
};

const renderFeaturesWithSuccess = async snapshotId => {
    const { result, waitFor } = renderHook(() => useFeatures({ source: 'Test', snapshotId: snapshotId }), {
        wrapper: createWrapper()
    });
    await waitFor(() => result.current.isSuccess);
    return { result, waitFor };
};

describe('Tests for DashboardFeaturesTable using sw mocks', () => {
    test('The component renders with title', async () => {
        const { getByText } = renderComponent();
        const { result } = await renderFeaturesWithSuccess(1);
        expect(result.current.isSuccess).toBe(true);
        expect(getByText('Trustworthy AI Pledges By Feature')).toBeInTheDocument();   
    });
    test('While data loading renders laoding', async () => {
        const { getByText } = renderComponent();
        const { result, waitFor } = renderHook(() => useFeatures({ source: 'Test', snapshotId: 1 }), {
            wrapper: createWrapper()
        });
        await waitFor(() => result.current.isLoading);
        expect(getByText(/loading/i)).toBeInTheDocument();
    });
    test("The value custom hook returns values list", async () => {
        const { result } = await renderFeaturesWithSuccess(1);
        expect(result.current.data.items.length).toBe(7);
    });
    test("Snapshots have correct totals for hounored and broken pledges", async () => {
        const { getByText } = renderComponent();
        await renderFeaturesWithSuccess(1);
        expect(getByText('Totals')).toBeInTheDocument();        
        const row = screen.getByText('Totals').closest("tr");
        expect(within(row).getByText('20')).toBeInTheDocument();
        expect(within(row).getByText('8')).toBeInTheDocument();
    });
    test('Clicking a value reveals related pledges', async () => {
        const { getByRole, getByText } = renderComponent();
        await renderFeaturesWithSuccess(1);
        const button = getByRole('button', {name: "Human agency and oversight"});
        userEvent.click(button);
        expect(getByText('We pledge to evaluate risk, so that fundamental rights are not negatively affected.')).toBeInTheDocument();
        const row = screen.getByText('Human agency and oversight').closest("tr");
        expect(within(row).getByText('Human agency and oversight')).toBeTruthy();
        expect(within(row).getAllByText(1)[0]).toBeTruthy();
        expect(within(row).getByText(2)).toBeTruthy();
    });
    test('Clicking value twice hides related pledges', async () => {
        const { getByRole, getByText, queryByText } = renderComponent();
        await renderFeaturesWithSuccess(1);
        const button = getByRole('button', {name: "Human agency and oversight"});
        userEvent.click(button);
        expect(getByText('We pledge to evaluate risk, so that fundamental rights are not negatively affected.')).toBeInTheDocument();
        userEvent.click(button);
        expect(await queryByText('We pledge to evaluate risk, so that fundamental rights are not negatively affected.')).not.toBeInTheDocument();
    });
});

describe.skip('DashboardFeaturesTable using local mocks', () => {
    test("The custom feature hook tested with locally mocked valid data", async () => {
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
        const expected = {source:'Test', id: 1, items: items};
        jest.spyOn(api, "getPledgesByFeatures").mockImplementation(() => {
            return Promise.resolve(expected)
        });
        const { result, waitFor } = renderHook(() => useFeatures({source:'Test', snapshotId: 1}), { wrapper: createWrapper() });
        await waitFor(() => result.current.isSuccess);
        expect(result.current.data.items.length).toEqual(1);
    });
    test("The custom feature hook tested with locally mocked null data", async () => {
        jest.spyOn(api, "getPledgesByFeatures").mockImplementation(() => {
            return Promise.resolve(null)
        });
        await renderFeaturesWithSuccess(1);
        const { getByText } = renderComponent();
        expect(getByText('Loading...')).toBeInTheDocument();
    });
})
