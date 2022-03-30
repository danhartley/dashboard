import { SliderProps } from './types';

const Slider = ({intialState, range, onChange}:SliderProps): JSX.Element => {

    const states = range.map((s,i) => {
        return {
            value: i,
            text: s
        }
    });

    const min = states[0].value;
    const max = states[states.length - 1].value;

    const state = states.filter(s => s.text === intialState)[0];
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        const change = states.find(h => h.value === value);
        if(change)
            onChange(change.text);
    };

    return (    
        <>
        { 
            !states ? null :
            <>
            <input type="range" id="slider" name="slider" min={min} onChange={handleChange} max={max} value={state.value} />
            <label htmlFor="slider">{state.text}</label>
            </>
        }
        </>
    )
};

export default Slider;