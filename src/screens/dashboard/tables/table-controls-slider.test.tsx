import { render, fireEvent } from "@testing-library/react";
import exp from "constants";
import Slider from "./table-controls-slider";

describe("A slider", () => {
  let intialState = 1;
  let range = [
    {
      id: 1,
      snapshot: "23 Jan 2022",
    },
    {
      id: 2,
      snapshot: "23 Feb 2022",
    },
    {
      id: 3,
      snapshot: "23 Mar 2022",
    },
  ];
  let namespace = "features";

  const handleChange = jest.fn();

  test("has a state which updates with each change", async () => {
    const { getByRole } = render(
      <Slider
        namespace={namespace}
        intialState={intialState}
        range={range}
        onChange={handleChange}
      ></Slider>
    );
    const slider = getByRole("slider") as HTMLInputElement;

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

  test("and has a label associated with the current state", () => {
    const { getByRole, getByLabelText } = render(
      <Slider
        namespace={namespace}
        intialState={intialState}
        range={range}
        onChange={handleChange}
      ></Slider>
    );
    const slider = getByRole("slider") as HTMLInputElement;
    const labelText = range.find(
      (r) => r.id === parseInt(slider.value)
    ).snapshot;
    expect(getByLabelText(labelText)).toBeInTheDocument();
    expect(getByLabelText(labelText).id).toBe("slider-features");
  });

  test("and is hidden when there are no data", () => {
    range = [];
    const { container } = render(
      <Slider
        namespace={namespace}
        intialState={intialState}
        range={range}
        onChange={handleChange}
      ></Slider>
    );
    expect(container).toContainHTML(
      "<div><div>Cannot return slider without a range</div></div>"
    );
  });
});
