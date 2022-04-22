# Production

## Locally

development build running locally:

        npm run start

with unit tests:

        npm run test


production build running locally:

        npm run build
        serve -s build -l 4000
        json-server public/db.json --port 5000


The production endpoint is set in the .env.production file.

Prettier

        npx prettier --check .

### json-server

I have it installed globally. ( See https://github.com/typicode/json-server )  
To test the endpoint, including POSTs, see db.http (requires REST Client extension in VS Code)

# Stack

[React: UI & UI state](https://reactjs.org/)  
[Typescript](https://www.typescriptlang.org/)  
[Cypress: for BDD](https://cypress.io/)  
[Jest: unit and component tests](https://jestjs.io/)  
[Testing Library: DOM-based selectors](https://testing-library.com/)  
[MSW: mocking browser requests on the network level](https://mswjs.io/)  
[Tailwind CSS: styling](https://tailwindcss.com/)  
[PostCSS: CC preprocessor](https://postcss.org/)

[Remix: client/server](https://remix.run/)  
[Reach UI: accessible React component library](https://reach.tech/)  
[GitHub | GitHub actions](https://github.com/features/actions)  
[Sentry: error reporting](https://sentry.io/)

# State

## Client or UI State

React (the one with hooks)  
React Hook Form (or none e.g. HTML names)

### CSS

Tailwind CSS

## Server State

React Query

# Dev tools

Typescript (type checking)  
Prettier (code formatter)  
ESLint (static analysis JS & TS)

## Lighthouse

e.g. run: lighthouse http://localhost:4000/ --budget-path=./perf/budget.json at CLI  
** Todo: add to CI **

## Testing & Counting Lines of Code

Jest
Cypress (Cucumber - Gherkin)  
React Testing Library  
Mock Service Worker  
Strict mode enabled ( see https://reactjs.org/docs/strict-mode.html )  
Static type checking with Typescript ( see https://reactjs.org/docs/static-type-checking.html )

## Debugging tests

npm run test:debug  
In Chrome open: about:inspect  
Select "inspect" on the process  
Click "play" in dev tools

( see https://create-react-app.dev/docs/debugging-tests )

# Tools

## Chrome DevTools console

Check for mocking (MSW)  
 New axe issues (accessibility)  
 Web vitals

## VS Code extensions

axe Accessibility Linter  
Babel JavaScript  
Cucumber (Gherkin)  
Jest (Orta)  
Prettier  
Tailwind CSS Intellisense  
REST Client

# Database

TBD  
MWS for local development and testing

# Source control

Git  
GitHub  
Trunk Based Developmnt ( see https://trunkbaseddevelopment.com/ ) ?? GitHib flow

Create a new branch from the main branch.  
Commit your code on this branch and push it to the remote repo (e.g. on GitHub).  
Open a Pull Request (aka Merge Request) in the remote repo.  
Run linter, type checks, and tests.  
Let your team members review your code.  
Merge the branch into the main branch.

( see https://profy.dev/article/react-tech-stack )

## Continuous Integration

TBD GitHub Actions ( see https://github.com/features/actions )

## cloc

https://github.com/AlDanial/cloc

e.g. cloc src

## find

e.g. find ./src -type f | xargs wc -w | tail -1
