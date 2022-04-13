import { render, within } from "@testing-library/react";

import Dashboard from "./dashboard";

jest.mock("src/screens/dashboard/tables/table-features", () => ({}) => (
  <>{<div>DashboardFeaturesTable</div>}</>
));
jest.mock("src/screens/dashboard/tables/table-values", () => ({}) => (
  <>{<div>DashboardValuesTable</div>}</>
));

describe("The dashboard", () => {
  test("has an H1 header text", () => {
    const { getByRole } = render(<Dashboard></Dashboard>);
    const { getByText } = within(getByRole("heading", { level: 1 }));
    expect(getByText("Facebook")).toBeInTheDocument();
  });

  test("and two tables", () => {
    const { getByText } = render(<Dashboard></Dashboard>);
    expect(getByText("DashboardFeaturesTable")).toBeInTheDocument();
    expect(getByText("DashboardValuesTable")).toBeInTheDocument();
  });
});
