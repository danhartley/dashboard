import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dashboard from "./dashboard";

jest.mock("src/screens/dashboard/tables/table-features", () => ({}) => (
  <>{<div>DashboardFeaturesTable</div>}</>
));
jest.mock("src/screens/dashboard/tables/table-values", () => ({}) => (
  <>{<div>DashboardValuesTable</div>}</>
));

describe("The dashboard", () => {
  test("has an H1 header text", () => {
    render(<Dashboard></Dashboard>);
    const { getByText } = within(screen.getByRole("heading", { level: 1 }));
    expect(getByText("Responsibility dashboard")).toBeInTheDocument();
  });
  test("has two tables", () => {
    render(<Dashboard></Dashboard>);
    expect(screen.getByText("DashboardFeaturesTable")).toBeInTheDocument();
    expect(screen.getByText("DashboardValuesTable")).toBeInTheDocument();
  });
  test("has tabs", () => {
    render(<Dashboard></Dashboard>);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });
  const setup = jsx => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    }
  }
  test("has default panel", async () => {
    setup(<Dashboard />);
    expect(screen.getAllByRole("tabpanel")[0]).toBeTruthy();    
  });
});
