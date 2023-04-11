# eslint-plugin-ng-module-sort

> Sort Angular and NestJS module imports, declarations, exports, controls, etc. Make it easier to find modules in the arrays by having an auto sort.

## Installation

[![NPM](https://img.shields.io/npm/v/eslint-plugin-ng-module-sort.svg)](https://www.npmjs.com/package/eslint-plugin-ng-module-sort) [wip]

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-ng-module-sort`:

```sh
npm install eslint-plugin-ng-module-sort --save-dev
```

## Usage

Add `ng-module-sort` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ng-module-sort"
    ]
}
```


Then configure the rules you want to use under the rules section.

## Rules

### decorator-array-items

With this rule you can detect unsorted arrays of imports, declarations, providers, exports, controllers and bootstrap in the following Angular and NestJS decorators:

- NgModule
- Component
- Pipe
- Decorator
- Module

```json
{
    "rules": {
        "ng-module-sort/decorator-array-items": [
            "error", {
                "reverseSort": false
            }
        ]
    }
}
```

A few example of it:

- Error
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-example',
  template: '',
  standalone: true,
  imports: [ // Run `eslint --fix .` to sort the members of imports.
    MatButtonModule,
    SharedModule,
    CommonModule,
    MagicComponent,
  ],
})
```

- Fix with default options
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-example',
  template: '',
  standalone: true,
  imports: [
    CommonModule,
    MagicComponent,
    MatButtonModule,
    SharedModule,
  ],
})
```

- With option `"reverseSort": true`
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-example',
  template: '',
  standalone: true,
  imports: [
    SharedModule,
    MatButtonModule,
    MagicComponent,
    CommonModule,
  ],
})
```

### decorator-properties

This rule is still in progress, but basically it will check if the properties in the above decorators are sorted, and provide an autofix to sort them.
