import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";

jest.mock("src/screens/dashboard/tables/table-features", () => ({}) => (
  <>{<div>DashboardFeaturesTable</div>}</>
));
jest.mock("src/screens/dashboard/tables/table-values", () => ({}) => (
  <>{<div>DashboardValuesTable</div>}</>
));

describe("The dashboard", () => {
  test("has an H1 header text", () => {
    window.history.pushState({}, 'Test page', "/RTW");
    render(<BrowserRouter><Dashboard></Dashboard></BrowserRouter>);
    const { getByText } = within(screen.getByRole("heading", { level: 2 }));
    expect(getByText("Pledges honoured and broken")).toBeInTheDocument();
  });
  test("has two tables", () => {
    window.history.pushState({}, 'Test page', "/RTW");
    render(<BrowserRouter><Dashboard></Dashboard></BrowserRouter>);
    expect(screen.getByText("DashboardFeaturesTable")).toBeInTheDocument();
    expect(screen.getByText("DashboardValuesTable")).toBeInTheDocument();
  });
  test("has tabs", () => {
    window.history.pushState({}, 'Test page', "/RTW");
    render(<BrowserRouter><Dashboard></Dashboard></BrowserRouter>);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });
  const setup = jsx => {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    }
  }
  test("has default panel", async () => {
    window.history.pushState({}, 'Test page', "/RTW");
    setup(<BrowserRouter><Dashboard /></BrowserRouter>);
    expect(screen.getAllByRole("tabpanel")[0]).toBeTruthy();    
  });
  describe("Tabs for source selection", () => {
    test.todo("has default selection");
  });
});
