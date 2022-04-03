import { render, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardControls from './dashboard-controls';

describe('DashboardControls', () => {

    const snapshots = ['23 Jan 2022', '23 Feb 2022', '23 Mar 2022'];
    const snapshot = '23 Jan 2022';

    const handleChange = jest.fn();

    test("Slider returns value on change", async () => {
        const { getByRole } = render(<DashboardControls snapshots={snapshots} snapshot={snapshot} onChange={handleChange}></DashboardControls>);
        const slider = getByRole('slider') as HTMLInputElement;
        expect(slider.value).toBe('0');
        fireEvent.change(slider, { target: { value: "1" } });        
        expect(handleChange).toHaveBeenCalled();
    });

    test("Display buttons return state", () => {
        const { getByRole } = render(<DashboardControls snapshots={snapshots} snapshot={snapshot} onChange={handleChange}></DashboardControls>);
        const tableButton = getByRole('tab', { name: 'Table' });
        expect(tableButton).toBeTruthy();
        userEvent.click(tableButton);
        const selectedButton = getByRole('tab', { selected: true });
        expect(tableButton).toEqual(selectedButton);
    });

    test("To have 3 display options", () => {
        const { getByRole } = render(<DashboardControls snapshots={snapshots} snapshot={snapshot} onChange={handleChange}></DashboardControls>);
        const { getByText } = within(getByRole("tablist"));
        expect(getByText('Chart')).toBeInTheDocument();
    });    
});