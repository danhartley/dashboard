import { SliderProps } from "src/shared/types";

const Slider = ({
  intialState,
  range,
  onChange,
  namespace,
}: SliderProps): JSX.Element => {
  if (range.length === 0) return <>Cannot return slider without a range</>;
  if (range.length === 1)
    return (
      <>Snapshot: {range.find((s) => s.snapshotId === intialState).snapshot}</>
    );

  const min = range[0].snapshotId;
  const max = range[range.length - 1].snapshotId;

  const state = range.find((s) => s.snapshotId === intialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const change = range.find((r) => r.snapshotId === value);
    onChange(change.snapshotId);
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
        value={state.snapshotId}
      />
      <label
        className="pl-2 text-xs"
        htmlFor={`slider-${namespace}`}
      >{`Snapshot: ${state.snapshot}`}</label>
    </>
  );
};

export default Slider;
