import Slider from "src/screens/dashboard/tables/table-controls-slider";
import ViewSelector from "src/screens/dashboard/tables/table-controls-view-selector";
import { ControlsProps } from "src/shared/types";

const TableControls = ({
  snapshots,
  snapshotId,
  onChange,
  namespace,
  target,
  setTarget,
  showSelector = false,
}: ControlsProps): JSX.Element => {
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
      {showSelector ? (
        <ViewSelector
          namespace={namespace}
          target={target}
          setTarget={setTarget}
        ></ViewSelector>
      ) : null}
    </section>
  );
};

export default TableControls;
