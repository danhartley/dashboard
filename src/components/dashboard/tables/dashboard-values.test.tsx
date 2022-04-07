import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks'
import { useValues } from './useValues';
import { QueryClient, QueryClientProvider } from 'react-query';

import DashboardValuesTable from './dashboard-values';

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        )
};
    
const renderComponent = () => {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}><DashboardValuesTable></DashboardValuesTable></QueryClientProvider>);
};

const renderValuesWithSuccess = async snapshotId => {
    const { result, waitFor } = renderHook(() => useValues({ source: 'Test', snapshotId: snapshotId }), {
        wrapper: createWrapper()
    });
    await waitFor(() => result.current.isSuccess);
    return { result, waitFor };
};

describe('Tests for DashboardValuesTable using sw mocks', () => {    
    test('The component renders with title', async () => {
        const { getByText } = renderComponent();
        await renderValuesWithSuccess(1);
        expect(getByText('Trustworthy AI Pledges By Values')).toBeInTheDocument();   
    });
    test('While data loading renders laoding', async () => {
        const { getByText } = renderComponent();
        const { result, waitFor } = renderHook(() => useValues({ source: 'Test', snapshotId: 1 }), {
            wrapper: createWrapper()
        });
        await waitFor(() => result.current.isLoading);
        expect(getByText(/loading/i)).toBeInTheDocument();
    });
    test("The value custom hook returns values list", async () => {
        const { result } = await renderValuesWithSuccess(1);
        expect(result.current.data.items.length).toBe(7);
    });
    test("Snapshots have correct totals for hounored and broken pledges", async () => {
        const { getByText } = renderComponent();
        await renderValuesWithSuccess(1);
        expect(getByText('Totals')).toBeInTheDocument();        
        const row = screen.getByText('Totals').closest("tr");
        expect(within(row).getByText('20')).toBeInTheDocument();
        expect(within(row).getByText('8')).toBeInTheDocument();
    });
    test('Clicking a value reveals related pledges', async () => {
        const { getByRole, getByText } = renderComponent();
        await renderValuesWithSuccess(1);
        const button = getByRole('button', {name: "Responsibility"});
        userEvent.click(button);
        expect(getByText('We pledge to evaluate risk, so that fundamental rights are not negatively affected.')).toBeInTheDocument();
        const row = screen.getByText('Responsibility').closest("tr");
        expect(within(row).getByText('Responsibility')).toBeTruthy();
        expect(within(row).getAllByText(1)[0]).toBeTruthy();
        expect(within(row).getByText(2)).toBeTruthy();
    });
    test('Clicking value twice hides related pledges', async () => {
        const { getByRole, getByText, queryByText } = renderComponent();
        await renderValuesWithSuccess(1);
        const button = getByRole('button', {name: "Responsibility"});
        userEvent.click(button);
        expect(getByText('We pledge to evaluate risk, so that fundamental rights are not negatively affected.')).toBeInTheDocument();
        userEvent.click(button);
        expect(await queryByText('We pledge to evaluate risk, so that fundamental rights are not negatively affected.')).not.toBeInTheDocument();
    });
});
