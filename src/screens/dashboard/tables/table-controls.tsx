import Slider from "./table-controls-slider";
import { ControlsProps } from "src/shared/types";

const TableControls = ({
  snapshots,
  snapshotId,
  onChange,
  namespace,
  target,
  setTarget,
}: ControlsProps): JSX.Element => {
  const options = [
    {
      text: "Table",
      active: true,
      target: "table",
    },
    {
      text: "Chart",
      active: false,
      target: "chart",
    },
    // {
    //   text: "Download",
    //   active: false,
    //   target: "download",
    // },
  ];

  type ChangeEvent = React.KeyboardEvent | React.MouseEvent;

  const handleDisplayOptionChange = (target) => {
    if (!setTarget) return;
    setTarget(target);
  };

  return (
    <section>
      <div className="mt-8 mb-4 justify-center flex">
        <Slider
          namespace={namespace}
          intialState={snapshotId}
          range={snapshots}
          onChange={onChange}
        ></Slider>
      </div>
      <nav id={`views-${namespace}`} className="flex justify-center">
        <div
          className="flex flex-row w-4/5 m-4 justify-evenly"
          role="tablist"
          id={namespace}
        >
          {options.map((o) => {
            return (
              <button
                key={`${o.text}-${namespace}`}
                id={`${o.target}-${namespace}`}
                role="tab"
                aria-selected={o.target === target}
                onClick={() => handleDisplayOptionChange(o.target)}
                className={`border p-2 border-solid rounded tracking-wider text-sm sm:text-base hover:border-sky-800 ${
                  o.target === target ? "border-slate-900" : "border-white"
                }`}
              >
                {o.text}
              </button>
            );
          })}
        </div>
      </nav>
    </section>
  );
};

export default TableControls;
