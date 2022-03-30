import { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import DashboardControls from './dashboard-controls';

describe('DashboardControls', () => {

    const snapShots = ['23 Jan 2022', '23 Feb 2022', '23 Mar 2022'];
    const snapShot = '23 Jan 2022';
    // const [activeSnapShot, setActiveSnapShot] = useState('');
    const setActiveSnapShot = e => {};

    test("Slider", () => {

        const { getByTestId } = render(<DashboardControls snapShots={snapShots} snapShot={snapShot} onChange={setActiveSnapShot}></DashboardControls>);

        const slider:any = getByTestId('slider');

        expect(slider.value).toBe('0');
        // expect(setActiveSnapShot).toHaveBeenCalledTimes(0);

        // fireEvent.input(slider, { target: { value: "1" } });

        // userEvent.click(slider);

        // expect(slider.value).toBe('1');
        
    });
});