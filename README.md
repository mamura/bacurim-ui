# Bacurim UI

Shared React UI library for the Bacurim ecosystem.

The project centralizes reusable UI components, design foundations and shared styles used by Bacurim applications.

## Requirements

Before starting, make sure the following tools are installed:

- Node.js 20 or newer
- npm 10 or newer
- Git

You can verify your environment with:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/mamura/bacurim-ui.git
cd bacurim-ui
```

Install the dependencies:

```bash
npm install
```

## Development

Start the local Vite development environment:

```bash
npm run dev
```

Vite will display the local URL in the terminal.

This environment is currently used to validate the library setup and shared styles.

## Component development

Components are developed and visualized in isolation using Storybook.

Start Storybook with:

```bash
npm run storybook
```

Storybook runs locally on port `6006` by default.

The Storybook environment loads the same shared styles used by `bacurim-ui`.

More information is available in:

```text
docs/component-development.md
```

## Code quality

### Lint

Run ESLint:

```bash
npm run lint
```

ESLint analyzes the TypeScript and React source code for potential problems and violations of the project's code-quality rules.

### Formatting

Apply automatic formatting:

```bash
npm run format
```

Check formatting without modifying files:

```bash
npm run format:check
```

Formatting is handled by Prettier.

## Build

Build the project:

```bash
npm run build
```

The command runs the TypeScript compiler checks and generates the production build with Vite.

To build the Storybook environment:

```bash
npm run build-storybook
```

The generated Storybook files are written to:

```text
storybook-static/
```

## Recommended validation

Before considering a change complete, run:

```bash
npm run format
npm run lint
npm run format:check
npm run build
npm run build-storybook
```

All commands should complete without errors.

## Project structure

The main source directories are:

```text
src/
├── components/
├── foundations/
├── styles/
├── utilities/
├── index.ts
├── index.css
├── App.tsx
└── main.tsx
```

### `src/components`

Reusable React UI components.

Components must remain independent from business rules of the applications that consume `bacurim-ui`.

### `src/foundations`

Design system foundations shared by the library.

This module will contain concepts such as colors, typography, spacing, radius and shadows.

### `src/styles`

Shared and global styles used by the library.

### `src/utilities`

Reusable helpers and utilities that are independent from application-specific business logic.

### `src/index.ts`

Root public entry point of the library.

Modules intended to be consumed outside `bacurim-ui` must be exported through the public entry points instead of exposing internal file paths.

## Internal imports

The `@` alias points to the `src` directory.

Example:

```ts
import { something } from "@/utilities";
```

More information about internal imports and public exports is available in:

```text
docs/imports-and-exports.md
```

## Additional documentation

Project documentation is available in the `docs` directory:

```text
docs/
├── component-development.md
├── imports-and-exports.md
└── project-structure.md
```

These documents describe the component development environment, module exports and project organization in more detail.
