import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Slider from './dashboard-controls-slider';

describe('Slider', () => {

    const intialState = '23 Jan 2022';
    const range = [
        '23 Jan 2022', '23 Feb 2022', '23 Mar 2022'
    ];
    
    it('Should reflect position of slider', () => {

        const handleChange = jest.fn();

        const { getByTestId } = render(<Slider intialState={intialState} range={range} onChange={handleChange}></Slider>);

        const slider = getByTestId('slider');

        expect(slider.value).toBe('0');
    });
});