Feature: Responsibility Dashboard

# As a team member, I want to review the use of pledges at my company, so that I can see if pledge writing is effective.
# As a potential client, I want to see RTW's Responsibility Dashboard, so that I can judge whether they are trustworthy.

Background:
  Given "Chimamanda" visits the dashboard URL

Scenario: Team members have access to their company's Responsibility Dashboard
  Then "Chimamanda" sees "Responsibility Dashboard" in the browser tab

Scenario: The public has access to the company's Responsibility Dashboard
  Given "JC" visits the dashboard URL 
  Then "JC" sees "Responsibility Dashboard" in the browser tab