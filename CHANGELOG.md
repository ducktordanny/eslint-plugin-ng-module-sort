# Changelog

## v1.3.2 - Tue May 20 2025 23:00:00 GMT+0200

Changes:

- Fix #5: Handle possible undefined when getting a variable instead of an inline Array in `ng-module-sort/decorator-array-items`

## v1.3.1 - Sat Jun 17 2024 23:00:00 GMT+0200

Changes:

- Fix package install error by adding prepack step to publish workflow (this fixes yarn's `postinstall` problem)

## v1.3.0 - Sat Jun 16 2024 20:15:00 GMT+0200

Changes:

- Add new `extraDecorators` and `extraProperties` options to extend the [default list](https://github.com/ducktordanny/eslint-plugin-ng-module-sort/blob/master/lib/constants.ts) that is being checked.

Dev note:

- CI/CD: Add Lint check and make sure that checks are needed before Release step
- Add prettier for formatting
- Use husky for git hooks, running pretty-quick and eslint before commit
- Cleanup test files for more readability

## v1.2.1 - Sat Jun 15 2024 17:30:00 GMT+0200

- Reduce published code

## v1.2.0 - Sat Jun 15 2024 16:30:00 GMT+0200

- Refactoring fixer code to be more precise: Now it handles indentations and single-line sortings.

## v1.1.1 - Sun Jan 28 2024 16:15:00 GMT+0200

- Refactors for more cleaner code

## v1.1.0 - Tue Apr 11 2023 21:40:00 GMT+0200

- Fix wrong repo url in package.json
- Use better approach to run order check

## v1.0.1 - Tue Apr 11 2023 21:20:00 GMT+0200

- Add missing .npmignore file
- Refresh README.md, remove unnecessary parts

## v1.0.0 - Tue Apr 11 2023 21:00:00 GMT+0200

- Add rule for detecting and fixing unsorted module arrays (decorator-array-items)
