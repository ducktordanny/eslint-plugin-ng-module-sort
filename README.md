# eslint-plugin-ng-module-sort

> Sort Angular and NestJS module imports, declarations, exports, controls, etc. Make it easier to find modules in the arrays by having an auto sort.

## Installation

[![NPM](https://img.shields.io/npm/v/eslint-plugin-ng-module-sort.svg)](https://www.npmjs.com/package/eslint-plugin-ng-module-sort)

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

or

```sh
yarn add --dev eslint
```

Next, install `eslint-plugin-ng-module-sort`:

```sh
npm install eslint-plugin-ng-module-sort --save-dev
```

or

```sh
yarn add --dev eslint-plugin-ng-module-sort
```

## Usage (Flat Config)

Versions `1.4.0` and above officially support ESLint flat configuration.

Import `eslint-plugin-ng-module-sort` in your `eslint.config.js` file, register it in `plugins`, and enable its rules using the `ng-module-sort` prefix.

For example:

```js
// eslint.config.js
const {defineConfig} = require('eslint/config');
const ngModuleSort = require('eslint-plugin-ng-module-sort');

module.exports = defineConfig([
  {
    // ...
    plugins: {
      'ng-module-sort': ngModuleSort,
    },
    rules: {
      'ng-module-sort/decorator-array-items': 'error',
      // ...
    },
  },
]);
```

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
      "error",
      {
        "reverseSort": false,
        "extraDecorators": [],
        "extraProperties": []
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
  imports: [
    SharedModule,
    MatButtonModule,
    MagicComponent,
    CommonModule,
  ],
})
```

- By using options `extraDecorator: ['YourDecorators']` and `extraProperties: ['yourProperties']` you can extend the default list that is used for the checks.

```ts
import {Component} from '@angular/core';

@YourDecorators({
  yourProperties: [
    Apple,
    Banana,
    Paprika,
    SomethingElse,
  ],
})
```

The default options can be found [here](./lib/constants.ts).

### decorator-properties

This rule is still in progress, but basically it will check if the properties in the above decorators are sorted, and provide an autofix to sort them.
