import { Given } from "cypress-cucumber-preprocessor/steps";

const url = '/';

Given('{string} visits the dashboard URL', function(user) {
  cy.visit(url);
});