# Frontend Template (React, Vite, TypeScript)
Frontent template for big applications

## Contents

-   [Quick Start - Manual](#1)
-   [Commands](#2)
-   [Git Workflow Rules](#3)
-   [Used Libraries](#4)
-   [Extension plugins](#5)

## <a name="1">Quick Start</a>

#### Requirements

-   Node.js 18+

#### Instructions

1. Copy `.env.example` to `.env` and modify it according to your environment.
2. Run `npm i`.
3. Run `npm run dev`.
4. Enjoy.

## <a name="2">Commands</a>

1. Generate a build file in the /public folder: `npm run build:checksum`
2. Simplified commit via terminal: `npm run commit`
3. Increase the version of the application, update app.json, and generate CHANGELOG.md:

    - `npm run release`
    - `npm run release:alpha` - for alpha versions
    - `npm run release:beta` - for beta versions
    - `npm run release:patch` - for patch versions
    - `npm run release:minor` - for minor versions
    - `npm run release:major` - for major versions

    > After these commands, you must call `git push --follow-tags origin develop` to push the version tag to GitHub.

## <a name="3">Git Workflow Rules</a>

1. All changes are made in a new branch based on `develop`.
2. Each commit must be accompanied by a comment describing the essence of the changes.
3. Commit formatting must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). (can be done via `npm run commit`)
    - `feature` - new functionality
    - `fix` - bug fixes
    - `refactor` - code changes without fixing bugs or adding new features
    - `style` - style changes
    - `test` - adding tests
    - `docs` - documentation changes
    - `chore` - project configuration changes and other auxiliary changes
4. After completing work on a task, create a **Pull Request** to the `develop` branch.
5. Each **Pull Request** must contain links to the tasks it resolves.
6. It's necessary to designate a code reviewer in the **Pull Request** (usually the **Team Lead** or **Tech Lead** of the project).

## <a name="4">Used Libraries</a>

-   axios - for HTTP requests
-   mantine - for UI work
-   react-router - for routing
-   react-hook-form - for form handling
-   vite - for project building and running the dev server
-   vite-plugin-checker - for type checking during development
-   typescript - for typing the entire project and its dependencies (including libraries)
-   eslint - for linting
-   zustand - for global state management
-   zod - for input validation
-   radash - contains useful functions for working with arrays and objects
-   dayjs - for date and time handling
-   @tanstack/react-query - for handling requests
-   @tanstack/table - for table handling
-   iconify - for UI icons
-   lint-staged - for running linters before committing
-   husky - for running hooks before committing
-   prettier - for code formatting
-   sort-package-json - for sorting package.json
-   @trivago/prettier-plugin-sort-imports - for sorting imports

## <a name="5">Extension plugins</a>

#### Visual Studio Code

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)
-   [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
-   [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
-   [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
-   [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
-   [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
