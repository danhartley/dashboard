import { screen, render, within } from "@testing-library/react";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Dashboard from "./dashboard";

jest.mock("src/screens/dashboard/tables/table-features", () => ({}) => (
  <>{<div>DashboardFeaturesTable</div>}</>
));
jest.mock("src/screens/dashboard/tables/table-values", () => ({}) => (
  <>{<div>DashboardValuesTable</div>}</>
));

const renderDashboardWithTables = () => {
  const mockedUseParams = useParams as jest.Mock<{ name: string; id: string }>;
  mockedUseParams.mockImplementation(() => ({ name: "RWT", id: "1" }));
  render(<Dashboard></Dashboard>);
};

describe("Check the mocked functions", () => {
  test("useParams", () => {
    expect(jest.isMockFunction(useParams)).toBe(true);
  });
});

describe("The dashboard", () => {
  test("has an H1 header text", () => {
    renderDashboardWithTables();
    const { getByText } = within(screen.getByRole("heading", { level: 2 }));
    expect(getByText("Honouring and breaking pledges")).toBeInTheDocument();
  });
  test("has two tables", () => {
    renderDashboardWithTables();
    expect(screen.getByText("DashboardFeaturesTable")).toBeInTheDocument();
    expect(screen.getByText("DashboardValuesTable")).toBeInTheDocument();
  });
  test("has tabs", () => {
    renderDashboardWithTables();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });
  const setup = (jsx) => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  };
  test("has default panel", async () => {
    renderDashboardWithTables();
    expect(screen.getAllByRole("tabpanel")[0]).toBeTruthy();
  });
});
