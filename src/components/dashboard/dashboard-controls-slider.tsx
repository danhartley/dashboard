import { SliderProps } from './types';

const Slider = ({intialState, range, onChange}:SliderProps): JSX.Element => {

    if(range.length === 0) return <div>Cannot return slider without a range</div>;

    const min = range[0].id;
    const max = range[range.length - 1].id;

    const state = range.filter(s => s.id === intialState)[0];
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        const change = range.find(h => h.id === value);
        onChange(change.id);
    };

    return (    
        <>
        <input type="range" id="slider" name="slider" min={min} onChange={handleChange} max={max} value={state.id} />
        <label htmlFor="slider">{state.snapshot}</label>           
        </>
    )
};

export default Slider;