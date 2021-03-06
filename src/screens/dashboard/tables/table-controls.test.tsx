import React from "react";
import { screen, render, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableControls from "./table-controls";
import { ViewType } from "src/shared/types";

describe("Table controls", () => {
  const snapshots = [
    {
      id: 1,
      snapshot: "1 Jan 2021",
      snapshotId: 1,
      source: "RTW",
    },
    {
      id: 2,
      snapshot: "1 July 2021",
      snapshotId: 2,
      source: "RTW",
    },
    {
      id: 3,
      snapshot: "1 Jan 2022",
      snapshotId: 3,
      source: "RTW",
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
          showSelector={true}
        ></TableControls>
      );
      const { getByText } = within(screen.getByRole("tablist"));
      expect(getByText("Chart")).toBeInTheDocument();
    });
    test("with table format preselected", () => {
      const { container } = render(
        <TableControls
          snapshots={snapshots}
          snapshotId={snapshotId}
          onChange={handleChange}
          target={"table" as ViewType}
          setTarget={jest.fn()}
          showSelector={true}
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
