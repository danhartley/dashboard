import { render, fireEvent } from '@testing-library/react';
import Slider from './dashboard-controls-slider';

describe('Slider', () => {

    let intialState = '23 Jan 2022';
    let range = [
        '23 Jan 2022', '23 Feb 2022', '23 Mar 2022'
    ];
    
    const handleChange = jest.fn();

    test('Should reflect position of slider', async () => {

        const { getByRole } = render(<Slider intialState={intialState} range={range} onChange={handleChange}></Slider>);

        const slider = getByRole('slider') as HTMLInputElement;

        expect(slider.value).toBe('0');
        
        fireEvent.change(slider, { target: { value: "1" } });
        
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith("23 Feb 2022");
       
        fireEvent.change(slider, { target: { value: "2" } });
        
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenCalledWith("23 Mar 2022");

    });

    test("Should return null when there range is empty", () => {
        range = [];
        const { container } = render(<Slider intialState={intialState} range={range} onChange={handleChange}></Slider>);
        expect(container).toContainHTML("<div><div>Cannot return slider without a range</div></div>");
    });
});