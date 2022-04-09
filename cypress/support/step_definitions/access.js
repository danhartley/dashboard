import { Before, After, Given, Then } from "cypress-cucumber-preprocessor/steps";

Then(`{string} sees {string} in the browser tab`, (user, title) => {
    cy.title().should('include', title);
});