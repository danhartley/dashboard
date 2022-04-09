Feature: View Filters

# As a team member, I want to see features with broken pledges, so that I can see which features we are struggling with.

Background:
  Given "Chimamanda" visits the dashboard URL

Scenario: Filter dashboard by broken pledges
  Given a list of filters
  When Chimamanda selects "broken pledges" filter
  Then the dashboard displays only features with "broken pledges"

# As a team member, I want to see pledges associated with a value, so that I can see what pledges the team made.

Scenario Outline: Display pledges associated with a value
  Given a list of values
  When the "<value>" value is selected    
  Then the pledges for "<value>" are displayed

  Examples:
    | value |
    | Responsibility |
    | Sustainability |
    | Safety |
    | Accountability |
    | Trust |
    | Fairness |

# As a user, I want to access the data in tabular form, because I use a screen reader.

Scenario: Show data in a variety of formats
  When Chamamanda selects the "Table" display option
  Then the data are displayed in "tabular" form

# As a user, I want to access the data in tabular form, because I use a screen reader.

Scenario: Show data in accessible format
  Then data are presented in tabular form