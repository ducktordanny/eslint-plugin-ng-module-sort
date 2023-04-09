# eslint-plugin-ng-module-sort

Sort Angular and NestJS module imports, declarations, exports, controls, etc.

## Installation

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

```json
{
    "rules": {
        "ng-module-sort/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


