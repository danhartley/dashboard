import { screen, render, fireEvent } from "@testing-library/react";
import Slider from "./table-controls-slider";

describe("A slider", () => {
  let intialState = 1;
  let range = [
    {
      id: 1,
      snapshot: "1 Jan 2020",
      snapshotId: 1,
      source: "RTW"
    },
    {
      id: 2,
      snapshot: "1 Jan 2021",
      snapshotId: 2,
      source: "RTW"
    },
    {
      id: 3,
      snapshot: "1 Jan 2022",
      snapshotId: 3,
      source: "RTW"
    }
  ];
  let namespace = "features";

  const handleChange = jest.fn();

  test("has a state which updates with each change", async () => {
    render(
      <Slider
        namespace={namespace}
        intialState={intialState}
        range={range}
        onChange={handleChange}
      ></Slider>
    );
    const slider = screen.getByRole("slider") as HTMLInputElement;

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
    render(
      <Slider
        namespace={namespace}
        intialState={intialState}
        range={range}
        onChange={handleChange}
      ></Slider>
    );
    const slider = screen.getByRole("slider") as HTMLInputElement;
    const labelText = range.find(
      (r) => r.id === parseInt(slider.value)
    ).snapshot;
    expect(screen.getByLabelText(labelText)).toBeInTheDocument();
    expect(screen.getByLabelText(labelText).id).toBe("slider-features");
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
      "<div>Cannot return slider without a range</div>"
    );
  });
  test("and shows the snapshot date when there is only one value in the range", () => {
    range = [
      {
        id: 1,
        snapshot: "1 Jan 2020",
        snapshotId: 1,
        source: "RTW"
      },
    ];
    const { container } = render(
      <Slider
        namespace={namespace}
        intialState={intialState}
        range={range}
        onChange={handleChange}
      ></Slider>
    );
    expect(container).toContainHTML("<div>1 Jan 2020</div>");
  });
});
