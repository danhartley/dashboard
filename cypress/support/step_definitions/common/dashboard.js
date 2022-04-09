import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'ethics/pledge-works/dashboard';

Given('{string} visits the dashboard URL', function(user) {
  cy.visit(url);
});