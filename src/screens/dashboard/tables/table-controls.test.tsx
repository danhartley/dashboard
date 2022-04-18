import { screen, render, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableControls from "./table-controls";

describe("Table controls", () => {
  const snapshots = [
    {
      id: 1,
      snapshot: "1 Jan 2020",
    },
    {
      id: 2,
      snapshot: "1 Jan 2021",
    },
    {
      id: 3,
      snapshot: "1 Jan 2022",
    },
  ];
  const snapshotId = 1;

  const handleChange = jest.fn();

  describe("include a slider for selecting snapshots", () => {
    test("which notifies the containing element when it changes", async () => {
      render(
        <TableControls
          snapshots={snapshots}
          snapshotId={snapshotId}
          onChange={handleChange}
        ></TableControls>
      );
      const slider = screen.getByRole("slider") as HTMLInputElement;
      expect(slider.value).toBe("1");
      fireEvent.change(slider, { target: { value: 2 } });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("and tab options to change the display format", () => {
    test("in a list", () => {
      render(
        <TableControls
          snapshots={snapshots}
          snapshotId={snapshotId}
          onChange={handleChange}
        ></TableControls>
      );
      const { getByText } = within(screen.getByRole("tablist"));
      expect(getByText("Chart")).toBeInTheDocument();
    });
    test("with one preselected", () => {
      render(
        <TableControls
          snapshots={snapshots}
          snapshotId={snapshotId}
          onChange={handleChange}
        ></TableControls>
      );
      const tableButton = screen.getByRole("tab", { name: "Table" });
      expect(tableButton).toBeTruthy();
      userEvent.click(tableButton);
      const selectedButton = screen.getByRole("tab", { selected: true });
      expect(tableButton).toEqual(selectedButton);
    });
  });
});
