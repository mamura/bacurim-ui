# Imports and Public Exports

## Internal imports

Internal modules should use the `@` alias when importing code from another top-level module.

The `@` alias points to the `src` directory.

Example:

```ts
import { something } from "@/utilities";
```

Relative imports may still be used for files that belong to the same module.

Example:

```ts
import { ButtonProps } from "./Button.types";
```

## Public exports

The public API of `bacurim-ui` is defined through entry points.

The root entry point is:

`src/index.ts`

Modules intended for consumers must be exported through this entry point.

Consumer applications should import public modules from the package:

```ts
import { Button } from "bacurim-ui";
```

They should not depend on the internal directory structure:

```ts
import { Button } from "bacurim-ui/src/components/Button";
```

## Module entry points

Each major module may expose its own local entry point:

- `src/components/index.ts`
- `src/foundations/index.ts`
- `src/utilities/index.ts`

The root `src/index.ts` aggregates these public exports.
