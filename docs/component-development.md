# Component Development

`bacurim-ui` uses Storybook as the isolated component development environment.

## Running Storybook

Install the project dependencies and run:

```bash
npm run storybook
```

Storybook runs locally on port `6006` by default.

## Building Storybook

To validate the production build of the component development environment, run:

```bash
npm run build-storybook
```

The generated static files are written to `storybook-static`.

## Stories

Stories describe isolated states and variations of UI components.

Component stories should be colocated with the component they represent.

Example:

```text
src/components/Button/
├── Button.tsx
├── Button.stories.tsx
└── index.ts
```

Storybook must not depend on any Bacurim application.

## Shared styles

Storybook loads the library styles through `src/index.css`.

This ensures that components rendered in Storybook use the same shared styles and foundations as `bacurim-ui`.
