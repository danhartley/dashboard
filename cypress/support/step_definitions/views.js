import {
  Before,
  After,
  Given,
  Then,
} from "cypress-cucumber-preprocessor/steps";

Given("a list of filters", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("Chimamanda selects {string} filter", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("the dashboard displays only features with {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Given("a list of values", function () {
  // cy.findByTestId('values');
  cy.get(`[data-table-id=values]`);
});

When("the {string} value is selected", function (value) {
  cy.get(`[data-table-id=${value.toLowerCase()}]`)
    .contains(value, { matchCase: false })
    .click();
});

Then("the pledges for {string} are displayed", async function (value) {
  const pledges = await cy.get(
    `[data-table-id=${value.toLowerCase()}-pledges]`
  );
  return pledges ? pledges.find("tr") : true;
});

When("Chamamanda selects the {string} display option", (option) => {
  cy.get("#features")
    .get("button", { name: /table/i })
    .contains(option, { matchCase: false });
});

Then("the data are displayed in {string} form", (style) => {
  return "pending"; //"tabular"
});

Then(`data are presented in tabular form`, () => {
  cy.get(".container").find("table");
});
