import { screen, render, within } from "@testing-library/react";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Dashboard from "./dashboard";

jest.mock("src/screens/dashboard/views/view-features", () => ({}) => (
  <>{<div>FeaturesView</div>}</>
));
jest.mock("src/screens/dashboard/views/view-values", () => ({}) => (
  <>{<div>ValuesView</div>}</>
));
jest.mock("src/screens/dashboard/views/view-pledges", () => ({}) => (
  <>{<div>PledgesView</div>}</>
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
    expect(getByText("RWT")).toBeInTheDocument();
  });
  test("has three tables", () => {
    renderDashboardWithTables();
    expect(screen.getByText("FeaturesView")).toBeInTheDocument();
    expect(screen.getByText("ValuesView")).toBeInTheDocument();
    expect(screen.getByText("PledgesView")).toBeInTheDocument();
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
