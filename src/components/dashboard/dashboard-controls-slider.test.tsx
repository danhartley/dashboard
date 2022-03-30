import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './dashboard-controls-slider';

describe('Slider', () => {

    const intialState = '23 Jan 2022';
    const range = [
        '23 Jan 2022', '23 Feb 2022', '23 Mar 2022'
    ];
    
    it('Should reflect position of slider', async () => {

        const handleChange = jest.fn();

        const { getByRole } = render(<Slider intialState={intialState} range={range} onChange={handleChange}></Slider>);

        const slider = getByRole('slider') as HTMLInputElement;

        expect(slider.value).toBe('0');
        
        fireEvent.change(slider, { target: { value: "1" } });
        
        expect(handleChange).toHaveBeenCalled();

    });
});