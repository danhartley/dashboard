import { render, fireEvent, within } from '@testing-library/react';

import DashboardControls from './dashboard-controls';

describe('DashboardControls', () => {

    beforeEach(() => {
        jest.resetModules();
    });

    const snapShots = ['23 Jan 2022', '23 Feb 2022', '23 Mar 2022'];
    const snapShot = '23 Jan 2022';

    const handleChange = jest.fn();

    test("Slider", async () => {

        const { getByRole } = render(<DashboardControls snapShots={snapShots} snapShot={snapShot} onChange={handleChange}></DashboardControls>);

        const slider = getByRole('slider') as HTMLInputElement;

        expect(slider.value).toBe('0');

        fireEvent.change(slider, { target: { value: "1" } });
        
        expect(handleChange).toHaveBeenCalled();
    });

    test("To have 3 display options", () => {
        const { getByRole } = render(<DashboardControls snapShots={snapShots} snapShot={snapShot} onChange={handleChange}></DashboardControls>);
        const { getByText } = within(getByRole("list"));
        expect(getByText('Chart')).toBeInTheDocument();
    });    
});