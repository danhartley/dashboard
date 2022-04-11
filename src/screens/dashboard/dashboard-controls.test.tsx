import { render, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardControls from "./dashboard-controls";

describe("Dashboard controls", () => {
  const snapshots = [
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
  const snapshotId = 1;

  const handleChange = jest.fn();

  describe("include a slider for selecting snapshots", () => {
    test("which notifies the containing element when it changes", async () => {
      const { getByRole } = render(
        <DashboardControls
          snapshots={snapshots}
          snapshotId={snapshotId}
          onChange={handleChange}
        ></DashboardControls>
      );
      const slider = getByRole("slider") as HTMLInputElement;
      expect(slider.value).toBe("1");
      fireEvent.change(slider, { target: { value: 2 } });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("and tab options to change the display format", () => {
    test("in a list", () => {
      const { getByRole } = render(
        <DashboardControls
          snapshots={snapshots}
          snapshotId={snapshotId}
          onChange={handleChange}
        ></DashboardControls>
      );
      const { getByText } = within(getByRole("tablist"));
      expect(getByText("Chart")).toBeInTheDocument();
    });
    test("with one preselected", () => {
      const { getByRole } = render(
        <DashboardControls
          snapshots={snapshots}
          snapshotId={snapshotId}
          onChange={handleChange}
        ></DashboardControls>
      );
      const tableButton = getByRole("tab", { name: "Table" });
      expect(tableButton).toBeTruthy();
      userEvent.click(tableButton);
      const selectedButton = getByRole("tab", { selected: true });
      expect(tableButton).toEqual(selectedButton);
    });
  });
});
