import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import DashboardControls from './dashboard-controls';

describe('DashboardControls', () => {

    const snapShots = ['23 Jan 2022', '23 Feb 2022', '23 Mar 2022'];
    const snapShot = '23 Jan 2022';

    const handleChange = jest.fn();

    test("Slider", async () => {

        const { getByRole } = render(<DashboardControls snapShots={snapShots} snapShot={snapShot} onChange={handleChange}></DashboardControls>);

        const slider:any = getByRole('slider');

        expect(slider.value).toBe('0');

        fireEvent.change(slider, { target: { value: "1" } });
        
        expect(handleChange).toHaveBeenCalled();   
    });
});