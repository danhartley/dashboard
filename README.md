# Responsible development

Responsible dashboard that illustrates the outcome of company pledges, broken down by principles, values and requirement checklists.

Based on [Create React App](https://create-react-app.dev/) and the TypeScript template.

## CLI commands

Build and server app locally against mocked data:

        npm run start

Run unit tests and unit tests with coverage:

        npm run test
        npm run coverage

Build production ready app and run it locally:

        npm run build
        serve -s build -l 4000
        json-server public/db.json --port 5000 --routes routes.json
        json-server https://danhartley.github.io/dashboard/db.json  --port 5000 --routes routes.json

NB The production endpoint is set in the .env.production file.

### json-server

I have it installed globally. ( See https://github.com/typicode/json-server )  
To test the endpoint, including POSTs, see db.http (requires REST Client extension in VS Code)

json-server https://danhartley.github.io/dashboard/db.json --port 5000 --routes routes.json

## Development stack

[React: UI & UI state](https://reactjs.org/)  
[React Query](https://react-query.tanstack.com/)
[Typescript](https://www.typescriptlang.org/)  
[Cypress: for BDD](https://cypress.io/)  
[Cucumber.js](https://cucumber.io/docs/installation/javascript/)
[Jest: unit and component tests](https://jestjs.io/)  
[Testing Library: DOM-based selectors](https://testing-library.com/)  
[MSW: mocking browser requests on the network level](https://mswjs.io/)  
[json-server](https://github.com/typicode/json-server)
[Heroku](https://devcenter.heroku.com/)
[Tailwind CSS: styling](https://tailwindcss.com/)  
[PostCSS: CC preprocessor](https://postcss.org/)
[Reach UI: accessible React component library](https://reach.tech/)  
[GitHub | GitHub actions](https://github.com/features/actions)

### Code validation

Typescript (type checking)  
ESLint (static analysis JS & TS)
Jest
Cypress (Cucumber - Gherkin)  
React Testing Library  
Mock Service Worker  
Strict mode enabled ( see https://reactjs.org/docs/strict-mode.html )  
Static type checking with Typescript ( see https://reactjs.org/docs/static-type-checking.html )

### Lighthouse

e.g. run: lighthouse http://localhost:4000/ --budget-path=./perf/budget.json at CLI  
** Todo: add to CI **

### Prettier standard code formatting

        npx prettier --write .
        npx prettier --check .

### cloc code line breakdown

https://github.com/AlDanial/cloc

e.g. cloc src

### find code file size

e.g. find ./src -type f | xargs wc -w | tail -1

Check for mocking (MSW)  
 New axe issues (accessibility)  
 Web vitals

### Debugging tests

npm run test:debug  
In Chrome open: about:inspect  
Select "inspect" on the process  
Click "play" in dev tools

( see https://create-react-app.dev/docs/debugging-tests )

### VS Code extensions

axe Accessibility Linter  
Babel JavaScript  
Cucumber (Gherkin)  
Jest (Orta)  
Prettier  
Tailwind CSS Intellisense  
REST Client

### Database

MWS for local development and testing
json-server for rest-styled queries

### Source control

Git  
GitHub  
Trunk Based Development ( see https://trunkbaseddevelopment.com/ ) or GitHib flow TBD
Husky ( see https://github.com/typicode/husky )

Create a new branch from the main branch.  
Commit your code on this branch and push it to the remote repo (e.g. on GitHub).  
Open a Pull Request (aka Merge Request) in the remote repo.  
Run linter, type checks, and tests.  
Let your team members review your code.  
Merge the branch into the main branch.

( see https://profy.dev/article/react-tech-stack )

### Continuous Integration

TBD GitHub Actions ( see https://github.com/features/actions )

### gh-pages

remove build from .gitignore
git add build && git commit -m "Initial dist subtree commit"
( manually change index.html paths to ./ )
git subtree push --prefix build origin gh-pages

OR,

( see also https://create-react-app.dev/docs/production-build )

NB when re-running may have to delete node_modules/.cache/gh-pages worked

## CRA

https://create-react-app.dev/docs/deployment/

Build & deploy: npm run deploy

### proxy in package.json

Valid only when running local dev server i.e. npm run start ** REMOVED **

--- "proxy": "https://danhartley.github.io/",

( see https://create-react-app.dev/docs/proxying-api-requests-in-development/ )
