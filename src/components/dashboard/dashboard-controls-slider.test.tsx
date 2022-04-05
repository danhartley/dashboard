import { render, fireEvent } from '@testing-library/react';
import Slider from './dashboard-controls-slider';

describe('Slider', () => {

    let intialState = 1;
    let range = [
        {
            id: 1,
            snapshot: '23 Jan 2022'
        },
        {
            id: 2,
            snapshot: '23 Feb 2022'
        },
        {
            id: 3,
            snapshot: '23 Mar 2022'
        },
    ];
    
    const handleChange = jest.fn();

    test('Should reflect position of slider', async () => {

        const { getByRole } = render(<Slider intialState={intialState} range={range} onChange={handleChange}></Slider>);

        const slider = getByRole('slider') as HTMLInputElement;

        expect(slider.value).toBe("1");
        
        fireEvent.change(slider, { target: { value: 2 } });
        
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(2);
       
        fireEvent.change(slider, { target: { value: 3 } });
        
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenCalledWith(3);

    });

    test("Should return null when there range is empty", () => {
        range = [];
        const { container } = render(<Slider intialState={intialState} range={range} onChange={handleChange}></Slider>);
        expect(container).toContainHTML("<div><div>Cannot return slider without a range</div></div>");
    });
});