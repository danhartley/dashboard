import { SliderProps } from "src/screens/dashboard/shared/types";

const Slider = ({
  intialState,
  range,
  onChange,
  namespace,
}: SliderProps): JSX.Element => {
  if (range.length === 0)
    return <>Cannot return slider without a range</>;
  if (range.length === 1)
    return <>{range.find((s) => s.id === intialState).snapshot}</>;

  const min = range[0].id;
  const max = range[range.length - 1].id;

  const state = range.find((s) => s.id === intialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const change = range.find(r => r.id === value);
    onChange(change.id);
  };

  return (
    <>
      <input
        type="range"
        id={`slider-${namespace}`}
        name="slider"
        min={min}
        onChange={handleChange}
        max={max}
        value={state.id}        
      />
      <span className="pl-2">Snapshot taken:</span><label className="pl-2" htmlFor={`slider-${namespace}`}>{state.snapshot}</label>
    </>
  );
};

export default Slider;
