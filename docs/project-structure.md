# Project Structure

The `bacurim-ui` source code is organized by responsibility.

## `src/components`

Reusable React UI components.

Components in this directory must remain independent from
business rules of applications that consume `bacurim-ui`.

## `src/foundations`

Design system foundations shared by the component library.

This directory will contain definitions such as colors,
typography, spacing, radius and shadows.

## `src/utilities`

Shared utilities and helper functions used by the library.

Utilities should not contain application-specific business logic.

## `src/styles`

Shared and global styles used by the library.

## Organization principles

- The library must remain independent from consumer applications.
- Business rules must not be implemented in `bacurim-ui`.
- Reusable UI concerns belong in the library.
- Application-specific features belong in the consuming application.
- New top-level modules should only be introduced when they represent
  a distinct responsibility within the library.
