import { Dispatch, SetStateAction } from "react";
import { EViewType } from "src/shared/enums";

type ViewSelectorProps = {
  namespace: string;
  target?: EViewType;
  setTarget?: Dispatch<SetStateAction<EViewType>>;
};

const ViewSelector = ({ namespace, target, setTarget }: ViewSelectorProps) => {
  const options = [
    {
      text: "Table",
      active: true,
      target: EViewType.table,
    },
    {
      text: "Chart",
      active: false,
      target: EViewType.chart,
    },
  ];

  const handleDisplayOptionChange = (target) => {
    if (!setTarget) return;
    setTarget(target);
  };

  return (
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
  );
};

export default ViewSelector;
